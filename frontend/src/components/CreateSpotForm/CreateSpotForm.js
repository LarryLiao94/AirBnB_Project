import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import "./CreateSpotFormModal.css";
import { createSpot } from "../../store/spot";

const CreateSpotForm = (props) => {
  const { closeModal } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [address, setAddress] = useState("");

  const [city, setCity] = useState("");

  const [state, setState] = useState("");

  const [country, setCountry] = useState("");

  const [lat, setLat] = useState("");

  const [lng, setLng] = useState("");

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");

  const [previewImage, setPreviewImage] = useState("");

  const [validationErrors, setValidationErrors] = useState([]);

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const updateAddress = (e) => setAddress(e.target.value);

  const updateCity = (e) => setCity(e.target.value);

  const updateState = (e) => setState(e.target.value);

  const updateCountry = (e) => setCountry(e.target.value);

  const updateLat = (e) => setLat(e.target.value);

  const updateLng = (e) => setLng(e.target.value);

  const updateName = (e) => setName(e.target.value);

  const updateDescription = (e) => setDescription(e.target.value);

  const updatePrice = (e) => setPrice(e.target.value);

  const updatePreviewImage = (e) => setPreviewImage(e.target.value);


  const [addressErr, setAddressErr] = useState(false);

  const [cityErr, setCityErr] = useState(false);

  const [stateErr, setStateErr] = useState(false);

  const [countryErr, setCountryErr] = useState(false);

  const [latErr, setLatErr] = useState(false);

  const [lngErr, setLngErr] = useState(false);

  const [nameErr, setNameErr] = useState(false);

  const [descriptionErr, setDescriptionErr] = useState(false);

  const [priceErr, setPriceErr] = useState(false);

  const [previewImageErr, setPreviewImageErr] = useState(false);


  useEffect(() => {
    const errors = [];
    setAddressErr(false);
    setCityErr(false);
    setStateErr(false);
    setCountryErr(false);
    setLatErr(false);
    setLngErr(false);
    setNameErr(false);
    setDescriptionErr(false);
    setPriceErr(false);
    setPreviewImageErr(false);


    if (address.length > 20) {
      setAddressErr(true);
      errors.push("address must be less than 20 characters long");
    }
    if (city.length > 20) {
      setCityErr(true);
      errors.push("city must be less than 20 characters long");
    }
    if (state.length > 20) {
      setStateErr(true);
      errors.push("state must be less than 20 characters long");
    }
    if (country.length > 40) {
      setCountryErr(true);
      errors.push("state must be less than 40 characters long");
    }
    if (isNaN(lat)) {
      setLatErr(true);
      errors.push("lat must be a number");
    }
    if (isNaN(lng)) {
      setLngErr(true);
      errors.push("lng must be a number");
    }
    if (name.length > 50) {
      setNameErr(true);
      errors.push("name must be less than 50 characters");
    }
    if (name.description > 250) {
      setDescriptionErr(true);
      errors.push("description must be less than 250 characters");
    }
    if (isNaN(price)) {
      setPriceErr(true);
      errors.push("price must be a number");
    }

    if (previewImage < 15){
      setPreviewImageErr(true);
      errors.push("link must be an image")
    }


   setValidationErrors(errors);
  }, [
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    previewImage,
  ]);

  if (!sessionUser) return <Redirect to="/signup" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length) return alert("cannot submit");

    const payload = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      previewImage,
    };

    let createdSpot = await dispatch(createSpot(payload));

    if (createdSpot) {
      handleCancelClick()

      closeModal(false);

      // history.push(`/spots/${createdSpot.id}`);
      history.push("/profile/spots");
    }
  };

  const handleCancelClick = () => {
    setAddress("");
    setCity("");
    setState("");
    setCountry("");
    setLat("");
    setLng("");
    setName("");
    setDescription("");
    setPrice("");
    setPreviewImage("");
  };

  return (
    <div className="create-spot-form--container">
      <div>
        <h1>Tell us about your place</h1>
      </div>
      <div className="right-half">
        {/* {hasSubmitted && validationErrors.length > 0 && (
          <div className="create-listing-errors">
            The following errors were found:
            <ul>
              {validationErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )} */}
        <form className="create-spot-form" onSubmit={handleSubmit}>
          <p className="create-spot-form-labels">Address</p>
          <input
            type="text"
            placeholder="Address"
            required
            value={address}
            onChange={updateAddress}
          />
          {hasSubmitted && addressErr && (
            <span className="error-text">Maximum address length is 20</span>
          )}
          <p className="create-spot-form-labels">City</p>
          <input
            type="text"
            placeholder="City"
            required
            value={city}
            onChange={updateCity}
          />
          {hasSubmitted && cityErr && (
            <span className="error-text">Maximum city length is 20</span>
          )}
          <p className="create-spot-form-labels">State</p>
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={updateState}
            required
          />
          {hasSubmitted && stateErr && (
            <span className="error-text">Maximum State length is 20</span>
          )}
          <p className="create-spot-form-labels">Country</p>
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={updateCountry}
            required
          />
          {hasSubmitted && countryErr && (
            <span className="error-text">Maximum Country length is 40</span>
          )}
          <p className="create-spot-form-labels">Latitude</p>
          <input
            type="number"
            placeholder="lat"
            value={lat}
            onChange={updateLat}
            required
          />
          {hasSubmitted && latErr && (
            <span className="error-text">Latitutde must be a number</span>
          )}
          <p className="create-spot-form-labels">Longitude</p>
          <input
            type="number"
            placeholder="lng"
            value={lng}
            onChange={updateLng}
            required
          />
          {hasSubmitted && lngErr && (
            <span className="error-text">Longitude must be a number</span>
          )}
          <p className="create-spot-form-labels">name</p>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={updateName}
            required
          />
          {hasSubmitted && nameErr && (
            <span className="error-text">
              Name must be less than 50 characters
            </span>
          )}
          <p className="create-spot-form-labels">description</p>
          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={updateDescription}
            required
          />
          {hasSubmitted && descriptionErr && (
            <span className="error-text">
              Description must less than 200 characters
            </span>
          )}
          <p className="create-spot-form-labels">price</p>
          <input
            type="number"
            placeholder="price"
            value={price}
            onChange={updatePrice}
            required
          />
          {hasSubmitted && priceErr && (
            <span className="error-text">Price must be a number</span>
          )}
          <p className="create-spot-form-labels">preview image</p>
          <input
            type="text"
            placeholder="preview image"
            value={previewImage}
            onChange={updatePreviewImage}
            required
            min={10}
          />
          {hasSubmitted && previewImageErr && (
            <span className="error-text">link must be to image</span>
          )}

          <div className="btn-wrap">
          <button className="Create-listing-btn edit_button" type="submit">
            Create
          </button>
          <button
            className="Cancel-listing-btn delete_button"
            type="button"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSpotForm;
