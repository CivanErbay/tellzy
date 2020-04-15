import React, { Component, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { db } from "./../config/firebaseConfig";
import ShareButton from "react-web-share-button";

export default class ResultStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      story: {},
      nextUnfold: false,
      storyUnfold: false,
      isDesktop: false, //This is where I am having problems
    };

    this.nextSetUnfold = this.nextSetUnfold.bind(this);
    this.storySetUnfold = this.storySetUnfold.bind(this);
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.updatePredicate);
  };

  updatePredicate = () => {
    this.setState({ isDesktop: window.innerWidth > 700 });
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

    const storyLink = `tellzy.web.app/story/${storyId}`;
    let nextLink = null;
    if (nextParticipant) nextLink = `tellzy.web.app/story/${storyId}/${nextParticipant.secret}`;
    return (
      <div>
        <div className="d-flex flex-column justify-content-center align-items-center mt-3">
          {
            <>
              {nextParticipant ? (
                <>
                  <Row className="wrap-links-linkpage d-flex justify-content-center align-items-center">
                    {!isDesktop ? (
                      <>
                        <LinkWithCopy
                          link={nextLink}
                          text="Edit Link"
                          isUnfold={nextUnfold}
                          setUnfold={this.nextSetUnfold}
                        >
                          <ShareButton
                            url="http://www.greatpage.com"
                            text={`How's ${nextParticipant.email}`}
                            title={`Tellzy is awesome`}
                          ></ShareButton>
                        </LinkWithCopy>
                      </>
                    ) : (
                      <>
                        <ShareButton
                          title="My Great Page"
                          text="A really great page"
                          url="http://www.greatpage.com"
                        >
                          <LinkWithCopy
                            link={nextLink}
                            text="Edit Link"
                            isUnfold={nextUnfold}
                            setUnfold={this.nextSetUnfold}
                          ></LinkWithCopy>
                        </ShareButton>
                        <LinkWithCopy
                          link={storyLink}
                          text="Result Link"
                          isUnfold={storyUnfold}
                          setUnfold={this.storySetUnfold}
                        ></LinkWithCopy>
                      </>
                    )}
                  </Row>
                  <p className="p-cs-true text-center mt-5">
                    Copy the
                    <span className="highlight"> Edit Link </span>
                    and send it to
                    <span className="highlight"> {nextParticipant.email}</span>
                  </p>

                  <p className="p2-cs-true2 text-center">
                    Soon you'll get the whole story! <br />
                    In the meantime, track the status on the <b>Result</b> Link
                  </p>
                </>
              ) : (
                <>
                  <p className="p-5 p-cs-true text-center">
                    Congratulations!<br></br> You were the last author, which means your collective story is
                    ready to read!
                  </p>
                  <LinkWithCopy link={storyLink} text="Result Link"></LinkWithCopy>
                </>
              )}
            </>
          }
        </div>
      </div>
    );
  }
}

function LinkWithCopy(props) {
  const { link, text, isUnfold, setUnfold } = props;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center m-4">
      <CopyToClipboard className="clipboard" text={link} onCopy={setUnfold}>
        <span>
          <Row className="row-cs-true p-3">
            <p className="mr-3 my-auto copy-cs-true">{text}</p>
            {isUnfold ? <i className="fas fa-check fa-3x"></i> : <i className="far fa-copy fa-3x"></i>}
            {/* <img src="assets/images/copy.png" /> */}
            {props.children}
          </Row>
        </span>
      </CopyToClipboard>
    </div>
  );
}
