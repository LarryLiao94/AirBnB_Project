import { Redirect } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MyReviews from "../MyReviews/MyReviews";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as reviewActions from "../../store/review";
import "./CurrentUser.css";

export default function UserInfo() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);
  // const userReviews = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(reviewActions.currentUserReviews()).catch(async (error) => {
      if (error) setErrors(error.message);
    });
  }, [dispatch]);

  let reviews = useSelector((state) => {
    
    return state.review.review;
  });

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <div className="user-info--container">
      <div className="user-info-and-reviews">
        <div className="userinfo-label">{`Hello ${sessionUser.username}`}</div>
        <div className="user-reviews--container">
          <div className="user-reviews-title">My Reviews</div>
        </div>
      </div>
          <div className='review-list--container'>
          <MyReviews className='review-list' reviews={reviews} />
          </div>
    </div>
  );
}
