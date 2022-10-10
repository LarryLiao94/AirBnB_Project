import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import * as reviewActions from '../../store/review';
import './EditReviewForm.css';

const EditReviewForm = ({reviewId, closeModal}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  //const { reviewId } = useParams();
  const [reviewComments, setReviewComments] = useState('');
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({})

  useEffect(() => {
    dispatch(reviewActions.currentUserReviews())
  }, [dispatch]);


  const handleSubmit = async (e) => {

    e.preventDefault();

    const updatedReview = {
      review: reviewComments,
      stars: parseInt(stars)
    };

    const res = await dispatch(reviewActions.editReview(reviewId, updatedReview))
      .catch(async (res) => {
        const data = await res.json();
        if (data.errors) setErrors({...data.errors});
      });

    if (res) {
      closeModal(false)
    }

  }

 // console.log("id", reviewId)

  return (
    <form className="edit-review-form" onSubmit={handleSubmit}>
      <div className="edit-review-container">
      <ul className="edit-review-errors">
      {
        Object.keys(errors).map(error => {
          return (<li>
            {errors[error]}
          </li>)
        }
        )
      }
      </ul>
      <div className="edit-info-btns">
        <textarea
          className="review-comments-input"
          type="text"
          value={reviewComments}
          onChange={(e) => setReviewComments(e.target.value)}
          placeholder="Enter your updated review here..."
          required
        />

        <div className="rating-section">
          <div className="updated-rating-title">New rating:</div>
          <input
          className="star-rating-input"
            type="number"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
          />
        </div>
      </div>
      <button className="submit-review-edit" type="submit">Update Review</button>
      </div>
    </form>
  );
}

export default EditReviewForm;