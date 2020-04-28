import React from "react";
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import auth, { uiConfig, user } from "../../actions/auth";

export default class SignInScreen extends React.Component {
    // state = { user: null };
    // componentDidMount = () => {
    //     auth.onAuthStateChanged(async (user) => {
    //         this.setState({ user });
    //     });

    render() {
        return (
            <div className="signin-div text-center">
                <img src="/assets/images/logo-white-gradient.png"></img>
                <h3>Work in progress..</h3>
                <p>Please use the New Story button</p>
                {/* {this.state.user ? (
                    <div>{`User already logged in: ${user.displayName}`}</div>
                ) : (
                    <StyledFirebaseAuth
                        uiConfig={uiConfig}
                        firebaseAuth={auth}
                    />
                )} */}

                {/* <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div> */}
            </div>
        );
    }
}
