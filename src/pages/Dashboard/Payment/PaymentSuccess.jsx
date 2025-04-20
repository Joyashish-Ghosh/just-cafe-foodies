import React from "react";
import { useState } from 'react';

import { useParams, Link } from "react-router-dom";

const PaymentSuccess = () => {
  const { tran_id } = useParams(); // Get the transaction ID from the URL
  const [showReview, setShowReview] = useState(true);

  return (
    <div className="flex justify-center items-center mt-12  ">

   
<div className="justify-center items-center bg-blue-100 shadow-lg rounded-lg h-60 py-4 w-full text-center max-w-md">
        <h1 className="text-2xl font-bold text-blue-900">Payment Successful</h1>
        <p className="mt-2 text-gray-700">
          <strong>Transaction ID:</strong> {tran_id}
        </p>
        <Link to="/dashboard/paymentHistory">
          <button className="bg-blue-950 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 mt-4 mb-10 ">
            Dashboard
          </button>
        </Link>
        {showReview && (
          <div className="flex items-end justify-end mr-5"><div className="flex items-center justify-center gap-2">
          <Link to="/dashboard/review">
            <button className=" btn bg-blue-950 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600">
              Add Reviews
            </button>
          </Link>
          <button
            className="btn  bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400"
            onClick={() => setShowReview(false)}
          >
            Skip
          </button>
        </div></div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
