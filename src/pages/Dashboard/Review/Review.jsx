import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Import useAxiosSecure hook

const Reviews = () => {
  const axiosSecure = useAxiosSecure(); // Initialize axiosSecure
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [rating, setRating] = useState("*"); // Default rating is "*"
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Default to today's date

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submit

    // Data object to send to the backend
    const reviewData = {
      name,
      details,
      rating, // Send the rating as asterisks
      date, // Include the date
    };

    try {
      // Sending the review data to the backend using POST via axiosSecure
      const response = await axiosSecure.post("/reviews", reviewData); // Post the review data

      if (response.status === 201) {
        alert("Review submitted successfully!");
        // Optionally, you can reset the form after successful submission
        setName("");
        setDetails("");
        setRating("*"); // Reset rating to default "*"
        setDate(new Date().toISOString().split("T")[0]); // Reset date to today's date
      } else {
        alert("Failed to submit review");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the review.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Submit Your Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div>
          <label htmlFor="name" className="block font-medium">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="details" className="block font-medium">Review Details:</label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="rating" className="block font-medium">Rating:</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)} // Update rating as asterisks
            className="border p-2 rounded"
            required
          >
            <option value="*">* </option>
            <option value="**">** </option>
            <option value="***">*** </option>
            <option value="****">**** </option>
            <option value="*****">***** </option>
          </select>
        </div>
        <div>
          <label htmlFor="date" className="block font-medium">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default Reviews;
