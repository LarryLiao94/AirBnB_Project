import React, { useEffect } from "react";
import * as spotActions from "../../store/spot";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import { NavLink } from "react-router-dom";
import SpotDetails from "../SpotDetails/index";
import "./Spots.css";

function Spots() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spot.spots);
  let allSpotsArr = [];

  for (let spot in spots) {
    allSpotsArr.push(spots[spot]);
  }

  useEffect(()=> {
    (async () => {
      await dispatch(spotActions.allSpots())
    })();
  }, [dispatch])

  if (!spots) {
    return null;
  }
  
  return (
    <div className="all-spots">
      <div className="allSpots">
        {allSpotsArr?.map((spot) => {
          
          return (
            <div className='single-spot-card' key={spot.id}>
            <div className='single-spot-image-card'>
                <img className='single-spot-image' src={spot.previewImage || spot.url} alt={spot.name} />
            </div>
            <Link className='single-spot-link' to={`/spots/${spot.id}`} key={spot.id}>
              {spot.name}
            </Link>
            <div className='single-spot-details-card'>
                <span className='single-spot-details-location'>
                    {`${spot.city}, ${spot.state}`}
                </span>
                <span className='single-spot-price'>
                    {`$${spot.price} per night`}
                </span>
            </div>
            </div>
          );
        })}
      </div>
      {/* <ul>
                {allSpotsArr.map(spot => {
                    return spot.name
                })}
            </ul> */}
    </div>
  );
}

export default Spots;
