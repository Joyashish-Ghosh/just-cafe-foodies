import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaBook, FaDollarSign, FaUsers } from "react-icons/fa";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { data: menuItems = [] } = useQuery({
    queryKey: ["menu-items", fromDate, toDate],
    queryFn: async () => {
      const res = await axiosSecure.get(`/menu?fromDate=${fromDate}&toDate=${toDate}`);
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
  queryKey: ["payments", user.email],
  queryFn: async () => {
    const res = await axiosSecure.get("/payments");
    return res.data;
  },
});

// Filter payments by selected date range
const filteredPayments = payments.filter((payment) => {
  const paymentDate = new Date(payment.payment_date).toISOString().split("T")[0];

  // If both fromDate and toDate are the same, show only payments from that date
  if (fromDate && toDate && fromDate === toDate) {
    return paymentDate === fromDate; // Fix logic to filter exactly by the same date
  }

  return (
    (!fromDate || paymentDate >= fromDate) &&
    (!toDate || paymentDate <= toDate)
  );
});

if (isLoading) return <h1 className="text-3xl font-bold">Loading..........</h1>;

// Flatten all items from filtered payments and create a continuous index
const allItems = filteredPayments.flatMap((payment) =>
  payment.cart?.map((item) => ({
    ...item,
    paymentDate: payment.payment_date, // include payment date to track where it's from
  }))
);

  return (
    <div className="my-12">
      <h2 className="text-3xl mx-60 my-3">
        <span>Hi, Welcome </span>
        {user?.displayName ? user.displayName : ""}
      </h2>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaDollarSign className="text-3xl" />
          </div>
          <div className="stat-title">Revenue</div>
          <div className="stat-value">${stats.revenue}</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaUsers className="text-3xl" />
          </div>
          <div className="stat-title">Users</div>
          <div className="stat-value">{stats.users}</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaUsers className="text-3xl" />
          </div>
          <div className="stat-title">Orders</div>
          <div className="stat-value">{stats.orders}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaBook className="text-3xl" />
          </div>
          <div className="stat-title">Menu Items</div>
          <div className="stat-value">{stats.menuItems}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>

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

      <table className="table-auto w-full mt-6 border">
        <thead>
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {groupedMenuItemsArray.map((item, index) => (
            <tr key={item._id}>
              <td className="border px-4 py-2">{index + 1}</td> {/* Continuous index */}
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.category}</td>
              <td className="border px-4 py-2">${item.price}</td>
              <td className="border px-4 py-2">{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* sale er jnno */}
      <div>
      <h2 className="text-3xl">Total Payments: {allItems.length}</h2>
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
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Item Name</th>
              <th>Item Price</th>
              <th>Item Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {allItems.map((item, index) => (
              <tr key={`${item.paymentDate}-${index}`}>
                <td>{index + 1}</td> {/* Continuous index */}
                <td>{item.name || "N/A"}</td>
                <td>{item.price ? `${item.price} BDT` : "N/A"}</td>
                <td>{item.quantity || 1}</td>
                <td>{item.total_amount} BDT</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default AdminHome;
