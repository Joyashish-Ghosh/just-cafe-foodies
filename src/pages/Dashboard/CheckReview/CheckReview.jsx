import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CheckReview = () => {
  const axiosSecure = useAxiosSecure(); // Initialize axiosSecure
  const [reviews, setReviews] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredReviews, setFilteredReviews] = useState([]);

  // Fetch all reviews from the backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosSecure.get("/reviews");
        setReviews(response.data); // Store all reviews in state
        setFilteredReviews(response.data); // Initialize filtered reviews with all reviews
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [axiosSecure]);

  // Filter reviews based on selected date
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value); // Set selected date
    const filtered = reviews.filter((review) => review.date === e.target.value);
    setFilteredReviews(filtered); // Update filtered reviews based on selected date
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
        <table className="table-auto w-full mt-6 border">
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
                <td colSpan="4" className="text-center py-2">No reviews found for the selected date.</td>
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
