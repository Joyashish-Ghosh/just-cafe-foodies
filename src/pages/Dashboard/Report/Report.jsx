import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaBook, FaDollarSign, FaUsers } from "react-icons/fa";

const Report = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);

  const { data: menuItems = [] } = useQuery({
    queryKey: ["menu-items", fromDate, toDate],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/menu?fromDate=${fromDate}&toDate=${toDate}`
      );
      return res.data;
    },
    enabled: !!fromDate && !!toDate, // Only fetch data if both dates are provided
  });

  // Helper function to check if a date is valid
  const isValidDate = (date) => {
    const parsedDate = new Date(date);
    return parsedDate instanceof Date && !isNaN(parsedDate);
  };

  // Filter items based on the selected date range (fromDate to toDate)
  const filteredMenuItems = menuItems.filter((item) => {
    const itemDate = item.date; // Assuming item has a `date` field

    // Ensure the date is valid
    if (!isValidDate(itemDate)) {
      console.error("Invalid item date:", itemDate); // Logging the invalid date for debugging
      return false; // Skip this item if the date is invalid
    }

    // Convert valid date to ISO format (YYYY-MM-DD)
    const formattedItemDate = new Date(itemDate).toISOString().split("T")[0];

    // Validate the fromDate and toDate before using them
    const validFromDate = fromDate ? new Date(fromDate) : null;
    const validToDate = toDate ? new Date(toDate) : null;

    if (validFromDate && !isValidDate(validFromDate)) {
      console.error("Invalid fromDate:", fromDate);
      return false;
    }

    if (validToDate && !isValidDate(validToDate)) {
      console.error("Invalid toDate:", toDate);
      return false;
    }

    // Check if both fromDate and toDate are the same
    if (fromDate && toDate && fromDate === toDate) {
      return formattedItemDate === fromDate;
    }

    // Otherwise, filter by date range
    return (
      (!fromDate || formattedItemDate >= fromDate) &&
      (!toDate || formattedItemDate <= toDate)
    );
  });

  // Group menu items by name, category, and price, and count duplicates
  const groupedMenuItems = filteredMenuItems.reduce((acc, item) => {
    const key = `${item.name}-${item.category}-${item.price}`;
    if (acc[key]) {
      acc[key].quantity += 1;
    } else {
      acc[key] = { ...item, quantity: 1 };
    }
    return acc;
  }, {});

  // Convert grouped items back to an array
  const groupedMenuItemsArray = Object.values(groupedMenuItems);

  // sale er jonno
  // Fetch payments data
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user.email, fromDate, toDate],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments?fromDate=${fromDate}&toDate=${toDate}`
      );
      return res.data;
    },
    enabled: !!user?.email && !!fromDate && !!toDate, // Ensure user.email exists
  });

  // Filter payments by selected date range
  const filteredPayments = payments.filter((payment) => {
    const paymentDate = new Date(payment.payment_date)
      .toISOString()
      .split("T")[0];

    // If both fromDate and toDate are the same, show only payments from that date
    if (fromDate && toDate && fromDate === toDate) {
      return paymentDate === fromDate; // Fix logic to filter exactly by the same date
    }

    return (
      (!fromDate || paymentDate >= fromDate) &&
      (!toDate || paymentDate <= toDate)
    );
  });

  // Flatten all items from filtered payments and create a continuous index
  const allItems = filteredPayments.flatMap((payment) =>
    payment.cart?.map((item) => ({
      ...item,
      paymentDate: payment.payment_date, // include payment date to track where it's from
    }))
  );
  // Group sell items by name and price, summing their quantities
  const groupedSellItems = allItems.reduce((acc, item) => {
    const key = `${item.name}-${item.price}`;

    if (acc[key]) {
      acc[key].quantity += item.quantity || 1;
    } else {
      acc[key] = { ...item, quantity: item.quantity || 1 };
    }

    return acc;
  }, {});

  // Convert grouped items back to an array
  const groupedSellItemsArray = Object.values(groupedSellItems);

  //extra food
  const extraFoodItems = useMemo(() => {
    return groupedMenuItemsArray
      .map((addItem) => {
        const sellItem = groupedSellItems[
          `${addItem.name}-${addItem.price}`
        ] || { quantity: 0 };

        // Ensure valid quantities for calculation
        const addItemQuantity = addItem.quantity || 0;
        const soldQuantity = sellItem.quantity;

        // Check if there is an excess quantity
        if (addItemQuantity > soldQuantity) {
          return {
            name: addItem.name,
            price: addItem.price,
            quantity: addItemQuantity - soldQuantity,
          };
        }
        return null;
      })
      .filter(Boolean); // Filter out null values
  }, [groupedMenuItemsArray, groupedSellItems]);

  // cherity er jnno

  if (isLoading)
    return (
      <h1 className="text-3xl font-bold text-green-800">Loading..........</h1>
    );

  return (
    <div className="my-12">
      <div className="my-4">
        <label className="mr-2">From Date:</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border p-2 rounded"
        />
        <label className="ml-4 mr-2">To Date:</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <h2 className="text-center font-bold mb-4 mt-4">Add item</h2>

      <table className="table-auto w-full mt-6 border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Item Name</th>
            <th className="border border-gray-300 px-4 py-2">Item Category</th>
            <th className="border border-gray-300 px-4 py-2">Item Price</th>
            <th className="border border-gray-300 px-4 py-2">Item Quantity</th>
          </tr>
        </thead>
        <tbody>
          {groupedMenuItemsArray.map((item, index) => (
            <tr key={item._id} className="even:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {item.category}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.price} BDT
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* sale er jnno */}
      <div>
        <h2 className="text-center font-bold mb-4 mt-4">Sell item</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">#</th>
                <th className="border border-gray-300 p-2">Item Name</th>
                <th className="border border-gray-300 p-2">Item Price</th>
                <th className="border border-gray-300 p-2">Item Quantity</th>
                <th className="border border-gray-300 p-2">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {groupedSellItemsArray.map((item, index) => {
                const totalPrice = item.price * item.quantity;
                return (
                  <tr
                    key={`${item.name}-${item.price}`}
                    className="even:bg-gray-100"
                  >
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    <td className="border border-gray-300 p-2">
                      {item.name || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {item.price ? `${item.price} BDT` : "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {item.quantity}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {totalPrice ? `${totalPrice} BDT` : "N/A"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Extra Food */}
        <h2 className="text-xl font-semibold mb-4">Extra Food</h2>
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
            {extraFoodItems.map((item, index) => (
              <tr key={index} className="even:bg-gray-100">
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{item.name}</td>
                <td className="border border-gray-300 p-2">{item.price} BDT</td>
                <td className="border border-gray-300 p-2">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
