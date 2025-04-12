import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CheckReview = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredReviews, setFilteredReviews] = useState([]);

  // Fetch all reviews from the backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosSecure.get("/reviews");

        // Sort descending based on date
        const sortedReviews = [...response.data].sort(
          (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
        );

        setReviews(sortedReviews);
        setFilteredReviews(sortedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [axiosSecure]);

  // Filter reviews by selected date
  const handleDateChange = (e) => {
    const selected = e.target.value;
    setSelectedDate(selected);

    const filtered = reviews.filter((review) => review.date === selected);

    // Optional: sort filtered reviews too, just to be safe
    const sortedFiltered = [...filtered].sort(
      (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
    );

    setFilteredReviews(sortedFiltered);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Check Reviews</h2>

      <div className="my-4">
        <label htmlFor="date" className="mr-2">Search by Date:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border p-2 rounded"
        />
      </div>

      <div className="mt-6">
        <table className="table-auto w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Details</th>
              <th className="border px-4 py-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-2">
                  No reviews found for the selected date.
                </td>
              </tr>
            ) : (
              filteredReviews.map((review) => (
                <tr key={review._id}>
                  <td className="border px-4 py-2">{review.name}</td>
                  <td className="border px-4 py-2">{review.details}</td>
                  <td className="border px-4 py-2">{review.rating}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CheckReview;
