import React, { Component } from "react";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { auth } from "./../../config/firebaseConfig";

export default class NavBar extends Component {
  render() {
    const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />;

    return (
      <header className="navbar navbar-expand-lg navbar-light bg-faded mb-auto">
        {/* Brand */}
        <a
          className="navbar-brand"
          href="https://github.com/pacoCroket/coord-noise-simulation"
          target="_blank"
          rel="noopener noreferrer"
        >
          TELLZY style me!
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {auth.isLoaded && links}
      </header>
    );
  }
}
