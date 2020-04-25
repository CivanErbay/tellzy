import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

export default class SignedInLinks extends Component {
  render() {
    return (
      <div className="container-fluid px-5">
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2" id="navbarNavDropdown">
          {/* start items */}
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
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/signin" className="nav-link">
                Log Out
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
