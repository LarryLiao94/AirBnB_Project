import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots/Spots";
import LoginFormModal from "./components/LoginFormModal";
import SpotDetails from "./components/SpotDetails";
import AirBnBlogo from "./images/AirBnBlogo.png";
import "./App.css";
import MySpots from "./components/MySpots";
import MyReviews from "./components/MyReviews/MyReviews";
import CreateSpotForm from "./components/CreateSpotForm";
import EditSpotForm from "./components/EditSpotForm/EditSpotForm";
import UserInfo from "./components/CurrentUserInfo";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const testing = dispatch(sessionActions.restoreUser());
    testing
      .then(() => {
        return setIsLoaded(true);
      })
      .catch((error) => console.log(error));
  }, [dispatch]);

  return (
    <>
      <Navigation img={AirBnBlogo} isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/login">
            <LoginFormModal />
          </Route>
          <Route path="/spots/:spotId">
            <SpotDetails />
          </Route>
          <Route path="/profile/spots">
            <MySpots />
          </Route>
          <Route exact path="/profile">
            <UserInfo />
          </Route>
          <Route exact path="/">
            <Spots />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
