import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import auth, { uiConfig, user } from "../../actions/auth";

export default class SignInScreen extends React.Component {
  state = { user: null };
  componentDidMount = () => {
    auth.onAuthStateChanged(async (user) => {
      this.setState({ user });
    });
  };

  render() {
    return (
      <div className="signin-div text-center">
        <h1 className="brand mb-5">Tellzy</h1>
        {this.state.user ? (
          <div>{`User already logged in: ${user.displayName}`}</div>
        ) : (
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        )}

        {/* <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div> */}
      </div>
    );
  }
}
