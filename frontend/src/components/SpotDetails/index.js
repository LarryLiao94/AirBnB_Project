import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import * as spotActions from "../../store/spot";
import { useDispatch, useSelector } from "react-redux";
import LoginFormModal from "../LoginFormModal";
import CreateReviewForm from "../CreateReviewForm";
import CreateReviewModal from "../CreateReviewForm/CreateReviewForm";
import EditSpotFormModal from "../EditSpotForm/index";
import "./SpotDetails.css";

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(spotActions.getSelectedSpot(spotId))
      .then(() => setIsLoaded(true))
      .catch(async (error) => {
        if (error) setErrors(error.message);
      });
  }, [dispatch]);
  const spot = useSelector((state) => state.spot.current);

  const sessionUser = useSelector((state) => state.session.user);
  let editAndDelete;
  let showReview;

  if (spot) {
    const deleteSpot = (e) => {
      e.preventDefault();
      dispatch(spotActions.deleteSpotByID(spot.id));
      history.goBack();
    };

    if (sessionUser?.id === spot?.Owner?.id) {
      editAndDelete = (
        <div>
          <EditSpotFormModal className="edit-spot-modal" />

          <button className="delete_button" onClick={deleteSpot}>
            Delete this spot
          </button>
        </div>
      );
    } else {
      if (sessionUser) {
        editAndDelete = <CreateReviewModal />;
      }
    }

    if (spot?.numReviews === 0) {
      showReview = (
        <p className="review-message--container">
          This spot don't have review yet
        </p>
      );
    } else {
      showReview = (
        <>
          <span className="heading">User Rating</span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star"></span>
          <p>
            {parseFloat(spot.avgStarRating).toFixed(2)} average based on{" "}
            {spot.numReviews} reviews.
          </p>
          <hr style={{ border: "3px", solid: "#f1f1f1" }}></hr>
        </>
      );
    }

    if (errors.length > 0) {
      return <div>This spot is not available, please check later</div>;
    }
  }
  return (
    isLoaded && (
      <div className="spot-details--div">
        <div className="spot-details--container">
          <div className="img-wrap">
            {spot.Images.map((image, i) => {
              return (
                <div className="column" key={i}>
                  <img src={image.url || image.previewImage} alt={`image${i}`} />
                </div>
              );
            })}
          </div>
          <div className="img-text">
            <h1>{spot.name}</h1>
            <h2>
              {spot.state}, {spot.country}
            </h2>
            <p>Description: {spot.description}</p>
            <div className="row">{showReview}</div>
            <div className="edit-and-delete--container">{editAndDelete}</div>
          </div>
        </div>
      </div>
    )
  );
};

export default SpotDetails;
