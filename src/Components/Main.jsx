import React, { Component } from "react";
import auth from "../actions/auth";
import { Redirect } from "react-router-dom";

export default class Main extends Component {
  render() {
    // if (!auth.currentUser) return <Redirect to="/" />;
    return <div>Welcome to your main page!</div>;
  }
}
