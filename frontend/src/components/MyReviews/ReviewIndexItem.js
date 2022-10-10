import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as reviewActions from "../../store/review";
import EditReviewForm from "../EditReviewForm/EditReviewForm";
import EditReviewFormModal from "../EditReviewForm/index";

const ReviewIndexItem = ({ review }) => {
  const dispatch = useDispatch();

  const deleteReview = (e) => {
    e.preventDefault();
    dispatch(reviewActions.deleteCurrentReview(review.id));
    dispatch(reviewActions.currentUserReviews());
    window.location = "/profile";
  };

  return (
    <div className="review-item">
      <p>
        {review.User.firstName}, {review.User.lastName}:
      </p>
      <p>{review.review}</p>
      <p>stars: {[...Array(review.stars)].map((r, i) => <span key={i} className="fa fa-star checked"></span>)}</p>
      <EditReviewFormModal id={review.id} />
      <button className="delete_button" onClick={deleteReview}>
        Delete
      </button>
    </div>
  );
};

export default ReviewIndexItem;
