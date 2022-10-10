import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import * as spotActions from '../../store/spot';
import './EditSpotForm.css';


function EditSpotForm({closeModal}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();
  const currentSpot = useSelector(state => state.spot.current);


  const [address, setAddress] = useState(currentSpot.address);
  const [city, setCity] = useState(currentSpot.city);
  const [state, setState] = useState(currentSpot.state);
  const [country, setCountry] = useState(currentSpot.country);
  const [lat, setLat] = useState(currentSpot.lat);
  const [lng, setLng] = useState(currentSpot.lng);
  const [name, setName] = useState(currentSpot.name);
  const [description, setDescription] = useState(currentSpot.description);
  const [price, setPrice] = useState(currentSpot.price);
  const [errors, setErrors] = useState({})
  const [selectedSpot, setSelectedSpot] = useState()


  // if (sessionUser) return (
  //   <Redirect to="/" />
  // );

  useEffect(() => {
    dispatch(spotActions.getSelectedSpot(spotId));
  }, [dispatch]);

  // useEffect(() => {
    
  // }, [currentSpot])

  const handleSubmit = async (e) => {

    e.preventDefault();
    const updatedSpot = {address, city, state, country, lat, lng, name, description, price};
    const res = await dispatch(spotActions.updateSpot(spotId, updatedSpot))
      .catch(async (res) => {
        const data = await res.json();
        if (data.errors) setErrors({...data.errors});
      });

      dispatch(spotActions.getSelectedSpot(spotId));
      closeModal();

  }

  return (
    <>
    {currentSpot &&
    <form className="edit-spot-form" onSubmit={handleSubmit}>
      <div className="edit-spot-form-container">
      <div>
      {/* <img className="edit-spot-img" src={`${currentSpot.url}`} alt="spot"/> */}
      </div>
      <ul className="edit-spot-errors">
      {
        Object.keys(errors).map(error => {
          return (<li>
            {errors[error]}
          </li>)
        }
        )
      }
      </ul>


      <div className="edit-spot-info-btns">
      <div className="edit-spot-labels">Address</div>
        <input
          className="edit-address-btn"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <div className="edit-spot-labels">City</div>
        <input
          className="edit-city-btn"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <div className="edit-spot-labels">State</div>
        <input
          className="edit-state-btn"
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <div className="edit-spot-labels">Country</div>
        <input
          className="edit-country-btn"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <div className="edit-spot-labels">Latitude</div>
        <input
          className="edit-lat-btn"
          type="number"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required
        />
        <div className="edit-spot-labels">Longitude</div>
        <input
          className="edit-long-btn"
          type="number"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          required
        />
        <div className="edit-spot-labels">Name</div>
        <input
          className="edit-name-btn"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="edit-spot-labels">Price</div>
        <input
          className="edit-price-btn"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <div className="edit-spot-labels">Description</div>
        <textarea
          className="edit-description-btn"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button className="submit-spot-edit" type="submit" >Update Listing</button>
      </div>
    </form>
    }
    </>
  );
}

export default EditSpotForm;