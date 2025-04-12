import { useEffect, useState } from "react";

const Charity = () => {
  const [donatedItems, setDonatedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]); // Default to today

  useEffect(() => {
    const fetchDonatedItems = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/extra-food");
        const data = await response.json();

        if (response.ok) {
          const filteredItems = data.filter((item) => {
            const itemDate = new Date(item.createdAt || item.date || item.timestamp);
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

    if (fromDate && toDate) {
      fetchDonatedItems();
    }
  }, [fromDate, toDate]);

  const handleDateChange = (e, setDate) => {
    setDate(e.target.value);
  };

  // ✅ Only keep unique items by name
  const getUniqueItems = (items) => {
    const seenNames = new Set();
    return items.filter(item => {
      if (seenNames.has(item.name)) return false;
      seenNames.add(item.name);
      return true;
    });
  };

  const uniqueDonatedItems = getUniqueItems(donatedItems);

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
      ) : uniqueDonatedItems.length > 0 ? (
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
            {uniqueDonatedItems.map((item, index) => (
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
