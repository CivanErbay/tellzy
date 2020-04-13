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

    const storyLink = `www.tellzy.web.app/story/${storyId}`;
    let nextLink = null;
    if (nextParticipant) nextLink = `www.tellzy.web.app/story/${storyId}/${nextParticipant.secret}`;

    return (
      <div>
        <div className="d-flex flex-column justify-content-center align-items-center mt-3">
          {
            <>
              {/* <h1 className="h1-cs-true">Thank you!</h1> */}
              <Row className="wrap-links-linkpage">
                <LinkWithCopy link={storyLink} text="Result Story Link"></LinkWithCopy>
                {nextParticipant && (
                  <>
                    <LinkWithCopy link={nextLink} text="Edit Story Link"></LinkWithCopy>

                    <p className="p-5 p-cs-true text-center">
                      Copy the <u>Edit Story Link</u> and send it to <strong>{nextParticipant.email}</strong>.{" "}
                      <br /> Soon you'll get the whole story! <br />
                      In the meantime, track the status on the <u>Result Story Link</u>
                    </p>
                  </>
                )}
              </Row>
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
