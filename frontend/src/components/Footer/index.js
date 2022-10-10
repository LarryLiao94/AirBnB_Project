import "./Footer.css";
import { NavLink } from "react-router-dom";
import React from "react";

const Footer = () => {
  return (
    <div className="footer--container">
      <a className="footer--links" href="https://github.com/LarryLiao94">
        <i className="github--gang"></i>
        GitHub
      </a>
      <a
        className="footer--links"
        href="https://github.com/LarryLiao94/AirBnB_Project"
      >
        <i className="readme--link"></i>
        About
      </a>
    </div>
  );
};

export default Footer;
