import { useEffect, useState } from "react";

const DeliverFood = () => {
  const [deliveredItems, setDeliveredItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default fromDate: 30 days ago
  const [fromDate, setFromDate] = useState("");

  // const [fromDate, setFromDate] = useState(
  //   new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  // );
  // Default toDate: today
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    const fetchDeliveredItems = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/kitchenOrders");
        const data = await response.json();

        if (response.ok) {
          const filteredItems = data.filter((order) => {
            const orderDate = new Date(order.payment_date);
            const from = new Date(fromDate);
            const to = new Date(toDate);
            to.setHours(23, 59, 59, 999); // Include full day of toDate

            return (!fromDate || orderDate >= from) && (!toDate || orderDate <= to);
          });

          const cartItems = filteredItems.flatMap((order) =>
            Array.isArray(order.cart)
              ? order.cart.map((item) => ({
                  name: item?.name || "Unknown",
                  quantity: item?.quantity || 0,
                  price: item?.price || 0,
                  payment_date: order.payment_date,
                  waiting_time: order.waiting_time || 0,
                  status: order.status || "Unknown",
                }))
              : []
          );

          // Group items by payment_date
          const groupedItems = cartItems.reduce((acc, item) => {
            const date = item.payment_date.split("T")[0]; // Group by date (yyyy-mm-dd)
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push(item);
            return acc;
          }, {});

          // Sort grouped items by date in descending order
          const sortedGroupedItems = Object.keys(groupedItems)
            .sort((a, b) => new Date(b) - new Date(a)) // Sort dates in descending order
            .reduce((acc, date) => {
              acc[date] = groupedItems[date];
              return acc;
            }, {});

          setDeliveredItems(sortedGroupedItems);
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

  const handleDateChange = (e, setDate) => {
    setDate(e.target.value);
  };

  return (
    <div className="my-12 flex justify-center">
      <div className="w-full max-w-4xl px-6 bg-gradient-to-r from-purple-50 via-blue-50 to-teal-50 p-6 rounded-lg">
        <h2 className="text-3xl text-teal-600 font-bold mb-4 text-center">Deliver Food</h2>

        {/* Date filters */}
        <div className="flex justify-start mb-4 bg-blue-50 p-4 rounded-lg shadow-md">
          <div className="mr-4">
            <label className="mr-2">From Date:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => handleDateChange(e, setFromDate)} // Handle change for fromDate
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

        {loading ? (
          <p className="text-lg text-blue-500 text-center">Loading delivered items...</p>
        ) : Object.keys(deliveredItems).length > 0 ? (
          <div>
            {Object.keys(deliveredItems).map((date) => (
              <div key={date} className="mb-6">
                <h3 className="text-2xl text-teal-600 font-semibold text-center mb-4">
                  Orders for {new Date(date).toLocaleDateString()}
                </h3>
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
                    {deliveredItems[date].map((item, index) => (
                      <tr key={index} className="even:bg-blue-100 odd:bg-purple-200">
                        <td className="border border-gray-300 p-2">{index + 1}</td>
                        <td className="border border-gray-300 p-2">
                          {item.name}
                          {/* Circle point for items from the same date */}
                          <span className="ml-2 inline-block w-2.5 h-2.5 bg-teal-600 rounded-full"></span>
                        </td>
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
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-500 text-center">No delivered food items found.</p>
        )}
      </div>
    </div>
  );
};

export default DeliverFood;
