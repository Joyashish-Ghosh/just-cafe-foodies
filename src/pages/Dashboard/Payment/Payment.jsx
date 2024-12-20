

import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
    return (
        <div>
            <SectionTitle heading="Payment" subHeading="Just Cafe Foodies"></SectionTitle>
            <div>
                {/* SSLCommerz does not need Elements wrapping */}
                <CheckoutForm />
            </div>
        </div>
    );
};

export default Payment;




// import { loadStripe } from "@stripe/stripe-js";
// import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm";

// //TO DO: add publish key
// const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_pk);

// const Payment = () => {
//     return (
//         <div>
//             <SectionTitle heading="Payment" subHeading="Just Cafe Foodies"></SectionTitle>
       
//        <div>
// <Elements stripe={stripePromise}>

//     <CheckoutForm></CheckoutForm>
// </Elements>
//        </div>
//         </div>
//     );
// };

// export default Payment;