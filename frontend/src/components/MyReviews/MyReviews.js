import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from "../../store/review";
import React, { useEffect, useState } from "react";
import ReviewIndexItem from "./ReviewIndexItem.js";
import { Link } from "react-router-dom";
import "./MyReviews.css";

const MyReviews = ({ reviews }) => {

  return (
    reviews && (
      <div className="row">
        {Object.keys(reviews).length !== 0 ? (
          <div>
            {Object.values(reviews)?.map((review) => (
              <ReviewIndexItem
                className="review-index--item"
                review={review}
                key={review.id}
              />
            ))}
          </div>
        ): 'You have no review(s) yet.'}
      </div>
    )
  );
};

export default MyReviews;
