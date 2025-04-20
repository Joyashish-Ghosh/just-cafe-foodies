import { useEffect, useState } from "react";

const DeliverFood = () => {
  const [deliveredItems, setDeliveredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]); // Default to today

  useEffect(() => {
    const fetchDeliveredItems = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/kitchenOrders");
        const data = await response.json();

        if (response.ok) {
          // Filter items based on selected date range
          const filteredItems = data.filter((order) => {
            const orderDate = new Date(order.payment_date);
            const from = new Date(fromDate);
            const to = new Date(toDate);
            return (
              (!fromDate || orderDate >= from) &&
              (!toDate || orderDate <= to)
            );
          });

          // Extract cart items and include additional fields (payment_date, waiting_time, and status)
          const cartItems = filteredItems.flatMap((order) => 
            order.cart.map((item) => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              payment_date: order.payment_date,
              waiting_time: order.waiting_time, // Assuming it's available in the order object
              status: order.status, // Assuming it's available in the order object
            }))
          );

          // Sort cartItems by payment_date (descending) and waiting_time (descending)
          cartItems.sort((a, b) => {
            const dateA = new Date(a.payment_date);
            const dateB = new Date(b.payment_date);

            // First, compare by payment_date in descending order (latest dates first)
            if (dateA > dateB) return -1;
            if (dateA < dateB) return 1;

            // If dates are the same, compare by waiting_time in descending order (longer waiting times first)
            return b.waiting_time - a.waiting_time;
          });

          setDeliveredItems(cartItems); // Set the sorted cart data
        } else {
          console.error("Failed to load delivered items:", data.message);
        }
      } catch (error) {
        console.error("Error fetching delivered items:", error);
      } finally {
        setLoading(false);
      }
    };

    if (fromDate && toDate) {
      fetchDeliveredItems();
    }
  }, [fromDate, toDate]);

  // Handle date input changes
  const handleDateChange = (e, setDate) => {
    setDate(e.target.value);
  };

  return (
    <div className="my-12 flex justify-center">
      <div className="w-full max-w-4xl px-6 bg-gradient-to-r from-purple-50 via-blue-50 to-teal-50 p-6 rounded-lg">
        {/* Heading */}
        <h2 className="text-3xl text-teal-600 font-bold mb-4 text-center">Deliver Food</h2>

        {/* Date Filter Inputs - Left Aligned with Blue Background */}
        <div className="flex justify-start mb-4 bg-blue-50 p-4 rounded-lg shadow-md">
          <div className="mr-4">
            <label className="mr-2">From Date:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => handleDateChange(e, setFromDate)}
              className="border p-2 rounded"
            />
          </div>
          <div>
            <label className="mr-2">To Date:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => handleDateChange(e, setToDate)}
              className="border p-2 rounded"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <p className="text-lg text-blue-500 text-center">Loading delivered items...</p>
        ) : deliveredItems.length > 0 ? (
          <table className="w-full border-collapse bg-purple-100">
            <thead className="bg-teal-500 text-white">
              <tr>
                <th className="border border-gray-300 p-2">#</th>
                <th className="border border-gray-300 p-2">Item Name</th>
                <th className="border border-gray-300 p-2">Price</th>
                <th className="border border-gray-300 p-2">Quantity</th>
                <th className="border border-gray-300 p-2">Payment Date</th>
                <th className="border border-gray-300 p-2">Waiting Time</th>
                <th className="border border-gray-300 p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {deliveredItems.map((item, index) => (
                <tr key={index} className="even:bg-blue-100 odd:bg-purple-200">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{item.name}</td>
                  <td className="border border-gray-300 p-2">{item.price} BDT</td>
                  <td className="border border-gray-300 p-2">{item.quantity}</td>
                  <td className="border border-gray-300 p-2">
                    {new Date(item.payment_date).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 p-2">{item.waiting_time} min</td>
                  <td className="border border-gray-300 p-2">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-red-500 text-center">No delivered food items found.</p>
        )}
      </div>
    </div>
  );
};

export default DeliverFood;
