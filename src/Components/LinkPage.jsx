import React, { Component, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { db } from "./../config/firebaseConfig";

import {
    EmailShareButton,
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share"; // NEW SHARE BUTTON
import {
    EmailIcon,
    FacebookIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";
import LinkWithCopy from "./Reusable/LinkWithCopy";

export default class ResultStory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isError: false,
            story: {},
            nextUnfold: false,
            storyUnfold: false,
            isDesktop: window.innerWidth > 700,
        };

        this.nextSetUnfold = this.nextSetUnfold.bind(this);
        this.storySetUnfold = this.storySetUnfold.bind(this);
    }

    componentDidMount = () => {
        window.addEventListener("resize", this.updatePredicate);
    };

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.updatePredicate);
    };

    updatePredicate = () => {
        this.setState({ isDesktop: window.innerWidth > 700 }); //this has something toDo with the Screensize and the Sharebutton I guess?
    };

    nextSetUnfold() {
        if (!this.state.nextUnfold) this.setState({ nextUnfold: true });

        if (this.state.storyUnfold) this.setState({ storyUnfold: false });
    }

    storySetUnfold() {
        if (!this.state.storyUnfold) this.setState({ storyUnfold: true });

        if (this.state.nextUnfold) this.setState({ nextUnfold: false });
    }

    render() {
        const { story, storyId, nextParticipant } = this.props;
        const { nextUnfold, storyUnfold, isDesktop } = this.state;

        const storyLink = `https://tellzy.web.app/story/${storyId}`;
        let nextLink = null;
        if (nextParticipant)
            nextLink = `https://tellzy.web.app/story/${storyId}/${nextParticipant.secret}`;

        return (
            <div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    {
                        <>
                            {nextParticipant ? (
                                <>
                                    <p className="p-cs-true text-center mt-3">
                                        Send
                                        <span className="highlight">
                                            {" "}
                                            {nextParticipant.email}{" "}
                                        </span>
                                        the Edit Link to continue the story!
                                    </p>
                                    <Row className="d-flex justify-content-center align-items-center">
                                        {!isDesktop ? (
                                            <>
                                                {" "}
                                                <Row className="d-flex justify-content-center align-items-center my-5 w-100 flex-wrap">
                                                    <div className="px-2">
                                                        <WhatsappShareButton
                                                            url={storyLink}
                                                            title={`Tellzy is awesome`}
                                                            children={""}
                                                        >
                                                            <WhatsappIcon
                                                                size={45}
                                                                round={true}
                                                            />
                                                        </WhatsappShareButton>
                                                    </div>
                                                    <div className="px-2">
                                                        <TelegramShareButton
                                                            url={storyLink}
                                                            title={`Tellzy is awesome`}
                                                            children={""}
                                                        >
                                                            <TelegramIcon
                                                                size={45}
                                                                round={true}
                                                            />
                                                        </TelegramShareButton>
                                                    </div>
                                                    <div className="px-2">
                                                        <FacebookShareButton
                                                            url={storyLink}
                                                            title={`Tellzy is awesome`}
                                                            children={""}
                                                        >
                                                            <FacebookIcon
                                                                size={45}
                                                                round={true}
                                                            />
                                                        </FacebookShareButton>
                                                    </div>
                                                    <div className="px-2">
                                                        <TwitterShareButton
                                                            url={storyLink}
                                                            title={`Tellzy is awesome`}
                                                            children={""}
                                                        >
                                                            <TwitterIcon
                                                                size={45}
                                                                round={true}
                                                            />
                                                        </TwitterShareButton>
                                                    </div>
                                                    <div className="px-2">
                                                        <EmailShareButton
                                                            url={storyLink}
                                                            title={`Tellzy is awesome`}
                                                            children={""}
                                                        >
                                                            <EmailIcon
                                                                size={45}
                                                                round={true}
                                                            />
                                                        </EmailShareButton>
                                                    </div>
                                                </Row>
                                            </>
                                        ) : (
                                            <>
                                                <LinkWithCopy
                                                    link={nextLink}
                                                    text="Edit Link"
                                                    isUnfold={nextUnfold}
                                                    setUnfold={
                                                        this.nextSetUnfold
                                                    }
                                                ></LinkWithCopy>
                                            </>
                                        )}
                                    </Row>

                                    <p className="p2-cs-true2 text-center">
                                        Soon you will get the whole story!{" "}
                                        <br />
                                        In the meantime, track the status on
                                        this <b>Progress</b> Link
                                    </p>

                                    <a href={storyLink} target="_blank">
                                        <Button className="btn-progress">
                                            Story Progress
                                        </Button>
                                    </a>
                                </>
                            ) : (
                                <>
                                    <p className="p-5 p-cs-true text-center">
                                        Your Tellzy story is complete! Now you
                                        can share it with your buddies:
                                        <br />
                                        <span className="highlight">
                                            {story.participants
                                                .map(
                                                    (participant) =>
                                                        participant.email
                                                )
                                                .join(", ")}
                                        </span>
                                    </p>
                                    {!isDesktop ? (
                                        <>
                                            {" "}
                                            <Row className="d-flex justify-content-center align-items-center my-5 w-100 flex-wrap">
                                                <div className="px-2">
                                                    <WhatsappShareButton
                                                        url={storyLink}
                                                        title={`Tellzy is awesome`}
                                                        children={""}
                                                    >
                                                        <WhatsappIcon
                                                            size={45}
                                                            round={true}
                                                        />
                                                    </WhatsappShareButton>
                                                </div>
                                                <div className="px-2">
                                                    <TelegramShareButton
                                                        url={storyLink}
                                                        title={`Tellzy is awesome`}
                                                        children={""}
                                                    >
                                                        <TelegramIcon
                                                            size={45}
                                                            round={true}
                                                        />
                                                    </TelegramShareButton>
                                                </div>
                                                <div className="px-2">
                                                    <FacebookShareButton
                                                        url={storyLink}
                                                        title={`Tellzy is awesome`}
                                                        children={""}
                                                    >
                                                        <FacebookIcon
                                                            size={45}
                                                            round={true}
                                                        />
                                                    </FacebookShareButton>
                                                </div>
                                                <div className="px-2">
                                                    <TwitterShareButton
                                                        url={storyLink}
                                                        title={`Tellzy is awesome`}
                                                        children={""}
                                                    >
                                                        <TwitterIcon
                                                            size={45}
                                                            round={true}
                                                        />
                                                    </TwitterShareButton>
                                                </div>
                                                <div className="px-2">
                                                    <EmailShareButton
                                                        url={storyLink}
                                                        title={`Tellzy is awesome`}
                                                        children={""}
                                                    >
                                                        <EmailIcon
                                                            size={45}
                                                            round={true}
                                                        />
                                                    </EmailShareButton>
                                                </div>
                                            </Row>
                                        </>
                                    ) : (
                                        <LinkWithCopy
                                            link={storyLink}
                                            text="Result Link"
                                            isUnfold={storyUnfold}
                                            setUnfold={this.storySetUnfold}
                                        ></LinkWithCopy>
                                    )}
                                    }
                                </>
                            )}
                        </>
                    }
                </div>
            </div>
        );
    }
}
