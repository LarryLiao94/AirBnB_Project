import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spot";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import EditSpotFormModal from "../EditSpotForm/index";
import DeleteSpot from "../DeleteSpot";
import "./MySpots.css";

const MySpots = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  
  // useEffect(() => {
  //   (async () => {
  //     await dispatch(spotActions.currentUserSpots());
  //   })();
  // }, [dispatch]);

  let allSpots = useSelector((state) => {
    return state.spot.spots;
  });


  useEffect(() => {
    (async() => {
      await dispatch(spotActions.allSpots())
    })();
  }, [dispatch])

  const mySpots = Object.values(allSpots)?.filter(spot => {
    return spot.ownerId == sessionUser.id
  });

  return mySpots && (
    <>
      <div className="my-spots-title">
        <h1>My Spots</h1>
      </div>
      <div className="spotList--container">
        {Object.values(mySpots)?.map((spot) => {
          return (
            <div className="singleSpot" key={spot.id}>
              <h1>{spot.name}</h1>
              <img
                src={spot.previewImage}
                alt="loading"
                className="previewImg"
              />
              <p>
                {spot.city}, {spot.country}
              </p>
              <p>${spot.price} per night</p>
              <Link to={`/spots/${spot.id}`}>
                <button>View Detail</button>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MySpots;
