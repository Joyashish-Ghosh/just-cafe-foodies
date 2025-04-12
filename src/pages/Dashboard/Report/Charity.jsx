// import { useLocation } from "react-router-dom";

// const Charity = () => {
//   const location = useLocation();
//   console.log(location.state);  // Log the entire state to debug

//   const extraFoodItems = location.state?.extraFoodItems || [];

//   return (
//     <div className="my-12">
//       <h2 className="text-xl font-semibold mb-4">Charity Page - Donated Items</h2>

//       {extraFoodItems.length > 0 ? (
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border border-gray-300 p-2">#</th>
//               <th className="border border-gray-300 p-2">Item Name</th>
//               {/* <th className="border border-gray-300 p-2">Price</th> */}
//               <th className="border border-gray-300 p-2">Quantity</th>
//             </tr>
//           </thead>
//           <tbody>
//             {extraFoodItems.map((item, index) => (
//               <tr key={index} className="even:bg-gray-100">
//                 <td className="border border-gray-300 p-2">{index + 1}</td>
//                 <td className="border border-gray-300 p-2">{item.name}</td>
//                 {/* <td className="border border-gray-300 p-2">{item.price} BDT</td> */}
//                 <td className="border border-gray-300 p-2">{item.quantity}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No Items to Donate</p>
//       )}
//     </div>
//   );
// };

// export default Charity;
import { useEffect, useState } from "react";

const Charity = () => {
  const [donatedItems, setDonatedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]); // Default to today

  // Handle fetching and filtering donated items based on selected dates
  useEffect(() => {
    const fetchDonatedItems = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/extra-food");
        const data = await response.json();

        if (response.ok) {
          // Filter client-side based on date range
          const filteredItems = data.filter((item) => {
            const itemDate = new Date(item.createdAt || item.date || item.timestamp); // Customize based on field in DB
            const from = new Date(fromDate);
            const to = new Date(toDate);
            return (
              (!fromDate || itemDate >= from) &&
              (!toDate || itemDate <= to)
            );
          });
          setDonatedItems(filteredItems);
        } else {
          console.error("Failed to load donated items:", data.message);
        }
      } catch (error) {
        console.error("Error fetching donated items:", error);
      } finally {
        setLoading(false);
      }
    };

    // Ensure to fetch data when both fromDate and toDate are provided
    if (fromDate && toDate) {
      fetchDonatedItems();
    }
  }, [fromDate, toDate]);

  // Handle the date filter changes
  const handleDateChange = (e, setDate) => {
    setDate(e.target.value);
  };

  return (
    <div className="my-12">
      <h2 className="text-xl font-semibold mb-4">Charity Page - Donated Items</h2>

      {/* Date Filter Inputs */}
      <div className="mb-4">
        <label className="mr-2">From Date:</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => handleDateChange(e, setFromDate)}
          className="border p-2 rounded"
        />
        <label className="ml-4 mr-2">To Date:</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => handleDateChange(e, setToDate)}
          className="border p-2 rounded"
        />
      </div>

      {/* Loading State */}
      {loading ? (
        <p className="text-lg text-blue-500">Loading donated items...</p>
      ) : donatedItems.length > 0 ? (
        // Table of Donated Items
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">#</th>
              <th className="border border-gray-300 p-2">Item Name</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {donatedItems.map((item, index) => (
              <tr key={item._id || index} className="even:bg-gray-100">
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{item.name}</td>
                <td className="border border-gray-300 p-2">{item.price} BDT</td>
                <td className="border border-gray-300 p-2">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-red-500">No donated items found.</p>
      )}
    </div>
  );
};

export default Charity;
