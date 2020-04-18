import React, { Component } from "react";
import { Row } from "react-bootstrap";
import ShareButtons from "./Reusable/ShareButtons";
import Button from "react-bootstrap/Button";
import { isEmpty } from "lodash";

export default class ResultStory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isError: false,
            story: {},
            nextUnfold: false,
            storyUnfold: false,
        };

        this.nextSetUnfold = this.nextSetUnfold.bind(this);
        this.storySetUnfold = this.storySetUnfold.bind(this);
    }

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
                                        <ShareButtons
                                            link={nextLink}
                                            nextParticipant={nextParticipant}
                                            story={story}
                                        ></ShareButtons>
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
                                    <ShareButtons
                                        link={nextLink}
                                        nextParticipant={nextParticipant}
                                        story={story}
                                    ></ShareButtons>
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
