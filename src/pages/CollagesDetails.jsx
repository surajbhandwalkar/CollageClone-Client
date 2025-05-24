
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/App.css";

const CollagesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [collages, setcollages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newReview, setNewReview] = useState({ username: "", rating: 5, comment: "" });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/collages/${id}`)
      .then((response) => {
        setcollages(response.data.collages); // Ensure correct data extraction
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch collages details.");
        setLoading(false);
      });
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.username && newReview.comment) {
      const updatedReviews = [...(collages.reviews || []), newReview];
      setcollages({ ...collages, reviews: updatedReviews });
      setNewReview({ username: "", rating: 5, comment: "" });
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  const averageRating = collages.reviews?.length
    ? (collages.reviews.reduce((sum, review) => sum + review.rating, 0) / collages.reviews.length).toFixed(1)
    : "No Ratings Yet";

  return (
    <div className="collages-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">⬅ Go Back</button>
      <h1 className="collages-title">{collages.collages}</h1>
      <img src={collages.image || "/default-collages.jpg"} alt={collages.collages} className="collages-detail-image" />
      <p className="collages-city">📍 Location: {collages.city}</p>
      <p className="collages-description">🍽️ A wonderful place for lerning and a great ambiance.</p>
      <p className="average-rating">⭐ {averageRating} / 5</p>
      
      <div className="reviews-section">
        <h2>Customer Reviews</h2>
        {collages.reviews?.length > 0 ? (
          collages.reviews.map((review, index) => (
            <div key={index} className="review-card">
              <p className="review-user"><strong>{review.username}</strong> ⭐ {review.rating}/5</p>
              <p className="review-comment">"{review.comment}"</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
      
      <div className="add-review-section">
        <h2>Add a Review</h2>
        <form onSubmit={handleReviewSubmit} className="review-form">
          <input
            type="text"
            placeholder="Your Name"
            value={newReview.username}
            onChange={(e) => setNewReview({ ...newReview, username: e.target.value })}
            required
          />
          <select value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}>
            {[5, 4, 3, 2, 1].map((rating) => (
              <option key={rating} value={rating}>{rating} Stars</option>
            ))}
          </select>
          <textarea
            placeholder="Write a review..."
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            required
          />
          <button type="submit" className="submit-button">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default CollagesDetails;
