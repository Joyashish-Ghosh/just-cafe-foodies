import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch payments data (which already contains cart items in the `items` array)
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      console.log("API Response:", res.data); // Debugging

      return res.data;
    },
  });

  // If payments data is still loading, show loading message
  if (isLoading)
    return <h1 className="text-3xl font-bold">Loading..........</h1>;

  return (
    <div>
      <h2 className="text-3xl">Total Payments: {payments.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Table Header */}
          <thead>
            <tr>
              <th>#</th>
              <th>Price</th>
              <th>Transaction ID</th>
              <th>Status</th>
              <th>Item Name</th>
              <th>Item Price</th>
              <th>Item Quantity</th>
              <th>Item Date</th>
            </tr>
          </thead>
       <tbody>
  {payments.map((payment, index) => {
    return payment.cart?.length > 0 ? (
      payment.cart.map((item, itemIndex) => (
        <tr key={`${payment._id}-${itemIndex}`}>
          <td>{index + 1}</td>
          <td>{payment.total_amount} BDT</td>
          <td>{payment.tran_id}</td>
          <td>{payment.payment_status ? "Done" : "Pending"}</td>
          <td>{item.name || "N/A"}</td>
          <td>{item.price ? `${item.price} BDT` : "N/A"}</td>
          <td>{item.quantity || 1}</td>
          <td>{payment.payment_date ? new Date(payment.payment_date).toLocaleDateString() : "N/A"}</td>
        </tr>
      ))
    ) : (
      <tr key={payment._id}>
        <td>{index + 1}</td>
        <td>{payment.total_amount} BDT</td>
        <td>{payment.tran_id}</td>
        <td>{payment.payment_status ? "Done" : "Pending"}</td>
        <td colSpan="4" className="text-center">
          No Items Available
        </td>
      </tr>
    );
  })}
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
//   const { data: payments = [], isLoading } = useQuery({
//     queryKey: ["payments", user.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/payments/${user.email}`);
//       return res.data;
//     },
//   });
//   if (isLoading)
//     return (
//       <>
//         <h1 className="text-3xl font-bold">Loading..........</h1>
//       </>
//     );
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
//             {payments.map((payment, index) => (
//               <tr key={payment._id}>
//                 <td>{index + 1}</td>
//                 <td>${payment.total_amount}</td>
//                 <td>{payment.tran_id}</td>
//                 <td>{payment.payment_status ? 'Done' : 'Pending'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PaymentHistory;



