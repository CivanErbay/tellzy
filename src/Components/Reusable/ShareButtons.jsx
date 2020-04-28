import React, { Component } from "react";
import { Row } from "react-bootstrap";
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
import LinkWithCopy from "./LinkWithCopy";

export default class ShareButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDesktop: window.innerWidth > 700,
        };
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

    render() {
        const { isDesktop } = this.state;
        const { link, nextParticipant, story } = this.props;

        console.log(this);
        const title = nextParticipant
            ? `Hey ${nextParticipant.email}, continue the story "${story.storyTitle}" by clicking this link`
            : `${story.storyTitle} is finished`;

        return (
            <div>
                {!isDesktop ? (
                    <>
                        <Row className="d-flex justify-content-center align-items-center my-5 w-100 flex-wrap">
                            <div className="px-2">
                                <WhatsappShareButton
                                    url={link}
                                    title={title}
                                    children={""}
                                >
                                    <WhatsappIcon size={45} round={true} />
                                </WhatsappShareButton>
                            </div>
                            <div className="px-2">
                                <TelegramShareButton
                                    url={link}
                                    title={title}
                                    children={""}
                                >
                                    <TelegramIcon size={45} round={true} />
                                </TelegramShareButton>
                            </div>
                            <div className="px-2">
                                <FacebookShareButton
                                    url={link}
                                    title={title}
                                    children={""}
                                >
                                    <FacebookIcon size={45} round={true} />
                                </FacebookShareButton>
                            </div>
                            <div className="px-2">
                                <TwitterShareButton
                                    url={link}
                                    title={title}
                                    children={""}
                                >
                                    <TwitterIcon size={45} round={true} />
                                </TwitterShareButton>
                            </div>
                            <div className="px-2">
                                <EmailShareButton
                                    url={link}
                                    title={title}
                                    children={""}
                                >
                                    <EmailIcon size={45} round={true} />
                                </EmailShareButton>
                            </div>
                        </Row>
                    </>
                ) : (
                    <LinkWithCopy
                        link={link}
                        text={nextParticipant ? "Edit Link" : "Story Link"}
                        isUnfold={""}
                        setUnfold={this.storySetUnfold}
                    ></LinkWithCopy>
                )}
            </div>
        );
    }
}
