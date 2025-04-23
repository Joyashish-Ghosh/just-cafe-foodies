import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Waiter = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submittedOrders, setSubmittedOrders] = useState([]);
  const axiosPublic = useAxiosPublic();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axiosPublic.get("/waiter");
      if (res.data && Array.isArray(res.data)) {
        setOrders(res.data);
      } else {
        console.error("No valid data returned:", res.data);
      }
    } catch (error) {
      console.error("Error fetching waiter orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOkClick = async (order) => {
    const confirmed = window.confirm("Served this order successfully?");
    if (!confirmed) return;

    const orderToSubmit = {
      order_id: order._id,
      cart: order.cart,
      payment_date: order.payment_date,
      waiting_time: order.waiting_time,
    };

    try {
      const res = await axiosPublic.post("/waiter/submit", orderToSubmit, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data?.success) {
        setSubmittedOrders((prev) => [...prev, order._id]);
        alert("Order served successfully.");
      } else {
        alert("Failed to submit order.");
      }
    } catch (err) {
      console.error("Error submitting order:", err);
      alert("Server error while submitting order.");
    }
  };

  if (loading) {
    return <div>Loading orders...</div>;
  }

  const sortedOrders = orders.sort((a, b) => {
    if (!a.payment_date || !b.payment_date) return 0;
    return new Date(b.payment_date) - new Date(a.payment_date);
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Waiter Orders</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Date & Time</th>
              <th>Item Name</th>
              <th>Number of Items</th>
              <th>Waiting Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.length > 0 ? (
              sortedOrders.map((item, index) => (
                <tr key={item._id} className={submittedOrders.includes(item._id) ? "bg-green-100" : ""}>
                  <th>{index + 1}</th>
                  <td>
                    {item?.payment_date
                      ? new Date(item.payment_date).toLocaleString("en-BD", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "N/A"}
                  </td>
                  <td>
                    {item.cart?.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {item.cart.map((cartItem) => (
                          <li key={cartItem._id}>{cartItem.name}</li>
                        ))}
                      </ul>
                    ) : (
                      "No items"
                    )}
                  </td>
                  <td>{item.cart.length}</td>
                  <td>{item.waiting_time || "N/A"}</td>
                  <td>
                    <label className="text-red-500 font-medium">
                      <input
                        type="checkbox"
                        className="mr-1 accent-red-500"
                        onChange={() => handleOkClick(item)}
                        disabled={submittedOrders.includes(item._id)}
                      />
                      OK
                    </label>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No orders to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Waiter;
