import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import DemoLogin from "../DemoLogin";
import * as sessionActions from "../../store/session";
import "./Navigation.css";
import CreateSpotFormModal from "../CreateSpotForm/index";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const demoLogin = () => {
    dispatch(
      sessionActions.login({
        email: "demo@user.io",
        password: "password",
      })
    );
  };

  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = (
  //     <>
  //     <CreateSpotFormModal />
  //     <ProfileButton user={sessionUser} />
  //     </>
  //   );
  // } else {
  //   sessionLinks = (
  //     <>
  //       <NavLink to='/login' className='login-link'>Login</NavLink>
  //       <NavLink to="/signup" className='signup-link'>Sign Up</NavLink>
  //       {/* <NavLink onClick={demoLogin} to='/' className='demo-login'>Demo Login</NavLink> */}
  //     </>
  //   );
  // }

  return (
    <header className="navBar">
      <div className="home-logo-button">
        <NavLink exact to="/">
          <img className="airbnb-logo-main" src={"../favicon.ico"} alt="" />
        </NavLink>
      </div>

      <div className='right-side-buttons'>
        {sessionUser &&
        <span className='become-a-host-button'>
          <CreateSpotFormModal />
        </span>}
        <ProfileButton sessionUser={sessionUser} />
      </div>
    </header>
  );
}

export default Navigation;
