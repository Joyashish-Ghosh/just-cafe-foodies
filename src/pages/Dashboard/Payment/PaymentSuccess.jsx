import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";

const PaymentSuccess = () => {
  const { tran_id } = useParams(); // Get the transaction ID from the URL

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Payment Successful</h1>
      <p>
        <strong>Transaction ID:</strong> {tran_id}
      </p>
      <Link to={"/dashboard/paymentHistory"}>
        <button>Dashboard</button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
