import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class SignedOutLinks extends Component {
  render() {
    return (
      <div className="container-fluid">
        {/* Right */}
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2" id="navbarNavDropdown">
          <div
            className="navbar-brand mx-auto order-0 text-capitalize"
            style={{ position: "absolute", left: "50%" }}
          >
            Noise2LED
          </div>

          <ul className="navbar-nav ml-auto mr-5">
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/signup" className="nav-link">
                Sing Up
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/signin" className="nav-link">
                Log In
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
