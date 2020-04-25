import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import auth, { uiConfig } from "../../actions/auth";

export default class SignInScreen extends React.Component {
    render() {
        return (
            <div className="signin-div text-center">
                <h1 className="brand mb-5">Tellzy</h1>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />

                {/* <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div> */}
            </div>
        );
    }
}
