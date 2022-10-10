import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useHistory, Link, Redirect } from "react-router-dom";
import "./ProfileButton.css";
import CreateSpotFormModal from "../CreateSpotForm/index";
import LoginFormModal from "../LoginFormModal";
import SignupFormPage from "../SignupFormPage";
import SignupFormModal from "../SignupFormPage/SignupFormModal";
import DemoLogin from "../DemoLogin";
import { NavLink } from "react-router-dom";

function ProfileButton({ sessionUser }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setShowMenu(false);
    history.push("/");
  };

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <div className="user-links" onClick={(e) => e.stopPropagation()}>
        <div className="user-links--container">
          <NavLink id="user-nav-link" to="/profile">
            Profile
          </NavLink>
        </div>
        <div className="user-links--container">
          <NavLink id="user-nav-link" to="/profile/spots">
            Listings
          </NavLink>
        </div>
        <div className="user-links--container">
          <NavLink id="user-nav-link" to="#" onClick={logout}>
            Log Out
          </NavLink>
        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <div className="guest-links" onClick={(e) => e.stopPropagation()}>
        <div>
          <DemoLogin />
        </div>
        <div>
          <LoginFormModal />
        </div>
        <div>
          <SignupFormModal />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="profile-button--container">
        <span className="menu" onClick={openMenu}><i className="fa fa-bars"></i></span>
        {showMenu && sessionLinks}
      </div>
    </>
  );
}

export default ProfileButton;
