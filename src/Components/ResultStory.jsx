import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { db } from "./../config/firebaseConfig";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import LinkWithCopy from "./Reusable/LinkWithCopy";
import "../styling/paper.css";
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share"; // NEW SHARE BUTTON
import { EmailIcon, FacebookIcon, TelegramIcon, TwitterIcon, WhatsappIcon } from "react-share";

import ShareButton from "react-web-share-button";

export default class ResultStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      storyFinished: false,
      story: {},
      storyId: null,
      isDesktop: window.innerWidth > 700,
    };
  }

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updatePredicate);
  };
  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    window.addEventListener("resize", this.updatePredicate);
    const storyId = params.storyId;
    this.getStory(storyId);
    this.setState({ storyId });
  }

  updatePredicate = () => {
    this.setState({ isDesktop: window.innerWidth > 700 }); //this has something toDo with the Screensize and the Sharebutton I guess?
  };

  async getStory(storyId) {
    let storyRef = await db
      .collection("stories")
      .doc(storyId)
      .get()
      .catch(function (error) {
        console.log("Error getting document:", error);
      });

    if (storyRef.exists) {
      const story = storyRef.data();
      const storyFinished = story.participants.every((participant) => participant.isSubmitted);
      this.setState({ story, isLoading: false, storyFinished });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      this.setState({ error: true });
    }
  }

  render() {
    // story = {storyTitle, participants: [{email, isSubmitted}], storyParts: [{author, text}]}
    const { story, isLoading, storyFinished, isDesktop, storyId } = this.state;

    const storyLink = `https://tellzy.web.app/story/${storyId}`;
    return (
      <div className="w-100">
        <Row>
          <Col>
            <Link to="/">
              <Button className="btn-home">Home</Button>
            </Link>
          </Col>
          <Col sm={8} className="h-100 px-sm-5 px-1">
            <div>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <div className="paper-story">
                  <h2>{story.storyTitle}</h2>
                  {storyFinished ? (
                    <>
                      <p>{story.storyParts.reduce((acc, curr) => acc + curr.text + "\n", "")}</p>
                      <br />
                      <div className="signature ml-auto">
                        <p>{story.storyParts.reduce((acc, curr) => acc + curr.author + "\n", "")}</p>
                      </div>
                    </>
                  ) : (
                    <div>
                      <p>Story in progress... </p>
                      <br />
                      <p>What the heck is going on?</p>
                      <p>
                        {story.participants.reduce((acc, curr) => (acc += curr.isSubmitted ? 1 : 0), 0)}/
                        {story.participants.length} have submitted
                      </p>
                      <ul>
                        {story.participants.map((participant) => (
                          <li key={participant.email}>
                            {participant.email} - {participant.isSubmitted ? "Submitted" : "Come on..."}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Col>
          <Col></Col>
        </Row>
        <Row className="d-flex flex-column align-items-center">
          <h1 className="h1">Tellzy</h1>
          <h3 className="text-capitalize mt-3 mb-4 text-center">
            <u>Share it with your friends!</u>
          </h3>
          {!isDesktop ? (
            <>
              {" "}
              <Row className="d-flex justify-content-center align-items-center my-5 w-100 flex-wrap">
                <div className="px-2">
                  <WhatsappShareButton url={storyLink} title={`Tellzy is awesome`} children={""}>
                    <WhatsappIcon size={45} round={true} />
                  </WhatsappShareButton>
                </div>
                <div className="px-2">
                  <TelegramShareButton url={storyLink} title={`Tellzy is awesome`} children={""}>
                    <TelegramIcon size={45} round={true} />
                  </TelegramShareButton>
                </div>
                <div className="px-2">
                  <FacebookShareButton url={storyLink} title={`Tellzy is awesome`} children={""}>
                    <FacebookIcon size={45} round={true} />
                  </FacebookShareButton>
                </div>
                <div className="px-2">
                  <TwitterShareButton url={storyLink} title={`Tellzy is awesome`} children={""}>
                    <TwitterIcon size={45} round={true} />
                  </TwitterShareButton>
                </div>
                <div className="px-2">
                  <EmailShareButton url={storyLink} title={`Tellzy is awesome`} children={""}>
                    <EmailIcon size={45} round={true} />
                  </EmailShareButton>
                </div>
              </Row>
            </>
          ) : (
            <LinkWithCopy
              link={storyLink}
              text="Result Link"
              isUnfold={""}
              setUnfold={this.storySetUnfold}
            ></LinkWithCopy>
          )}
        </Row>
      </div>
    );
  }
}
