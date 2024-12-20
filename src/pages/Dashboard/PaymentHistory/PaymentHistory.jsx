import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });
  if (isLoading)
    return (
      <>
        <h1 className="text-3xl font-bold">Loading..........</h1>
      </>
    );
  return (
    <div>
      <h2 className="text-3xl">Total payments: {payments.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Price</th>
              <th>Transaction</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>${payment.total_amount}</td>
                <td>{payment.tran_id}</td>
                <td>{payment.payment_status ? 'Done' : 'Pending'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;



// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../hooks/useAuth";
// import useAxiosSecure from "./../../../hooks/useAxiosSecure";

// const PaymentHistory = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const { data: payments = [] } = useQuery({
//     queryKey: ['payments', user.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/payments/${user.email}`);
//       return res.data;
//     },
//   });
//   return (
//     <div>
//       <h2 className="text-3xl">Total payments: {payments.length}</h2>
//       <div className="overflow-x-auto">
//         <table className="table">
//           {/* head */}
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Price</th>
//               <th>Transaction</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {payments.map((payment, index) => 
//               <tr key={payment._id}>
//                 <td>{index +1}</td>
//                 <td>${payment.price}</td>
//                 <td>{payment.transactionId}</td>
//                 <td>{payment.status}</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PaymentHistory;