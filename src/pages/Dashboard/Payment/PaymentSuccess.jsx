import React from "react";
import { useParams, Link } from "react-router-dom";

const PaymentSuccess = () => {
  const { tran_id } = useParams(); // Get the transaction ID from the URL

  return (
    <div className="flex justify-center items-center mt-12 ">

   
      <div className="justify-center items-center bg-blue-100 shadow-lg rounded-lg h-36 py-2 w-full text-center max-w-md">
        <h1 className="text-2xl font-bold text-blue-900">Payment Successful</h1>
        <p className="mt-2 text-gray-700">
          <strong>Transaction ID:</strong> {tran_id}
        </p>
        <Link to="/dashboard/paymentHistory">
          <button className="bg-blue-950 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 mt-4">
            Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
