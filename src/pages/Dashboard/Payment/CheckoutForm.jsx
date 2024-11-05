import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import useCart from "./../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [cart, refetch] = useCart();
  const navigate = useNavigate();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure.post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => console.error("Error in creating payment intent:", err));
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (card === null) return;

    const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (paymentError) {
      setError(paymentError.message);
      return;
    }
    setError("");

    // Confirm the payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || "anonymous",
          name: user?.displayName || "anonymous",
        },
      },
    });

    if (confirmError) {
      setError("Payment confirmation error");
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      // Save payment info to database
      const payment = {
        email: user.email,
        price: totalPrice,
        transactionId: paymentIntent.id,
        date: new Date(),
        cartIds: cart.map((item) => item._id),
        menuItemIds: cart.map((item) => item.menuId),
        status: "pending",
      };

      try {
        const res = await axiosSecure.post("/payments", payment);
        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Payment Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          
          // Refetch the cart data
          await refetch();
          console.log("Updated cart data after payment:", cart);

          navigate('/dashboard/paymentHistory');
        }
      } catch (error) {
        console.error("Error saving payment:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-sm btn-primary my-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && (
        <p className="text-green-600">Your transaction id: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
