import React, { Component, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { db } from "./../config/firebaseConfig";

export default class ResultStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      story: {},
    };
  }

  render() {
    const { story, storyId, nextParticipant } = this.props;

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
                  <h1 className="h1-cs-true">
                    <u>Thank you!</u>
                  </h1>
                  <Row className="wrap-links-linkpage d-flex justify-content-center align-items-center">
                    <LinkWithCopy link={nextLink} text="Edit Link"></LinkWithCopy>
                    <LinkWithCopy link={storyLink} text="Result Link"></LinkWithCopy>
                  </Row>
                  <p className="p-cs-true text-center mt-5">
                    Copy the
                    <span className="highlight"> Edit </span>
                    Link and send it to
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
  const { link, text } = props;
  const [isUnfold, setUnfold] = useState(false);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center m-4">
      <CopyToClipboard className="clipboard" text={link} onCopy={() => setUnfold(true)}>
        <span>
          <Row className="row-cs-true p-3">
            <p className="mr-3 my-auto copy-cs-true">{text}</p>
            <img src="assets/images/copy.png" />
          </Row>
        </span>
      </CopyToClipboard>
      {isUnfold && (
        <>
          <p className="mt-3">Succesfully copied!</p>
        </>
      )}
    </div>
  );
}
