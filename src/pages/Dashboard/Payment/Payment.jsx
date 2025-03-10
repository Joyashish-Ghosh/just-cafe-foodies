import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
  return (
    <div>
      <SectionTitle
        heading="Payment"
        subHeading="Just Cafe Foodies"
      ></SectionTitle>
      <div>
        {/* SSLCommerz does not need Elements wrapping */}
        <CheckoutForm></CheckoutForm>
      </div>
    </div>
  );
};

export default Payment;

