import React, { Component } from "react";
import auth from "../actions/auth";
import { getUserData } from "../actions/io";
import "../styling/mainview.css";

export default class MainView extends Component {
  state = {
    user: null,
    userData: null,
  };

  componentDidMount = () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.setState({ user });
        let userData = await getUserData(user.uid);
        this.setState({ userData });
      } else {
        this.setState({ user, userData: null });
      }
    });
  };

  render() {
    const { user, userData } = this.state;

    if (!user) return <div className="w-100 text-center">Loading...</div>;

    return (
      <div className="mainview w-100 text-center">
        <p>Welcome to your main page!</p>
        <p>{user.uid}</p>
      </div>
    );
  }
}
