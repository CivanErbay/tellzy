import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import auth from "../actions/auth";
import { getUserData } from "../actions/io";
import StoryList from "./Reusable/StoryList";
import ProgressInfo from "./Reusable/ProgressInfo";
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
        if (!user || !userData)
            return <div className="w-100 text-center">Loading...</div>;
        const { storiesParticipant } = userData;

        return (
            <Row className="first-part w-100 h-100 text-center">
                <Col md></Col>
                <Col sm={7}>
                    <ProgressInfo />

                    <StoryList
                        heading="Participant Stories"
                        stories={storiesParticipant}
                    />
                    <div className="paper-wrap mt-3">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nullam gravida vulputate odio, et venenatis
                            arcu malesuada non. Etiam at magna ac lacus posuere
                            dictum. Mauris euismod lectus in nibh interdum,
                            vitae facilisis est imperdiet. Integer id mauris
                            lacinia, ultrices odio vitae, tincidunt massa.
                            Aliquam a risus tellus. Vestibulum vehicula, orci in
                            convallis maximus, tortor tortor egestas massa,
                            vitae dictum quam felis ut metus. Etiam eget
                            convallis urna. Quisque egestas lacus tempus nibh
                            vulputate, id blandit lacus malesuada. Mauris ornare
                            diam ut augue posuere, sodales sagittis mi dapibus.
                            Maecenas rhoncus velit ac magna convallis, nec
                            viverra metus gravida. Suspendisse vestibulum
                            sollicitudin mi non interdum. Nam sit amet mattis
                            est. Cras metus dui, aliquet non eros in, ornare
                            scelerisque nibh. Etiam tristique congue vestibulum.
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Mauris imperdiet mattis felis, vitae rutrum
                            ipsum dignissim molestie. Vestibulum massa metus,
                            volutpat ultrices tellus eu, aliquet tincidunt
                            velit. Vestibulum porta vehicula diam, ac luctus
                            arcu rhoncus vestibulum. Pellentesque tempor ut
                            libero quis feugiat. In accumsan ultricies ipsum, id
                            congue eros tempor quis. Ut vitae sagittis sem. Cras
                            a finibus purus. Maecenas et nulla enim. Fusce sit
                            amet scelerisque magna. Nunc ornare sodales dui, nec
                            commodo lectus scelerisque non. Praesent at libero
                            id ex dapibus placerat a nec enim. Vestibulum
                            pellentesque lacinia turpis feugiat dignissim.
                            Phasellus sapien felis, pretium non eros vitae,
                            posuere vulputate tortor. Donec suscipit
                            pellentesque ligula. Ut non dui viverra, facilisis
                            quam ut, imperdiet orci. Curabitur quam nisi,
                            commodo sit amet velit id, facilisis eleifend orci.
                            Morbi eget vestibulum leo. Donec pellentesque ex
                            dui, ut accumsan augue malesuada et. Pellentesque id
                            faucibus lectus.
                        </p>
                    </div>
                </Col>
                <Col md className="text-left"></Col>
            </Row>
        );
    }
}
