import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as reviewActions from "../../store/review";
import "./CreateReviewForm.css";
import * as spotActions from "../../store/spot";

function CreateReviewForm({ loadSpotId, onSubmit, closeReviewModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const [reviewComments, setReviewComments] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      review: reviewComments,
      stars: parseInt(stars),
    };
    console.log("got here>>>")
    let res = await dispatch(reviewActions.createNewReview(spotId, newReview))
    .catch(async (res) => {
      const data = await res.json();
    });


    if (res) {
      closeReviewModal(false);
      history.push("/");
    }else{
      console.log("got here>>")
      alert("You already have a review!")
    }
  };

  return (
    <form className="add-review-form--container" onSubmit={handleSubmit}>
      <div className="add-review--div">
        <ul className="add-review-errors">
          {Object.keys(errors).map((error) => {
            return <li>{errors[error]}</li>;
          })}
        </ul>
        <div className="edit-info-btns">
          <textarea
            className="review-comments-input"
            type="text"
            value={reviewComments}
            onChange={(e) => setReviewComments(e.target.value)}
            placeholder="Enter your review here"
            required
          />
          <div className="add-rating-section">
            <div className="add-rating-title">Rating:</div>
            <input
              className="rating-input"
              type="number"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
              required
              min={1}
              max={5}
            />
          </div>
        </div>
        <button className="add-review-submit-btn" type="submit">
          Save
        </button>
      </div>
    </form>
  );
}

export default CreateReviewForm;
