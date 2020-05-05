import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import db from "../actions/io";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import ShareButtons from "./Reusable/ShareButtons";
import "../styling/paper.css";
import { isEmpty } from "lodash";

export default class ResultStory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isError: false,
            storyFinished: false,
            story: {},
            storyId: null,
            validParticipant: {},
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
            const storyFinished = story.participants.every(
                (participant) => participant.isSubmitted
            );
            this.setState({ story, isLoading: false, storyFinished });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            this.setState({ error: true });
        }
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    

  
    render() {
        // story = {storyTitle, participants: [{email, isSubmitted}], storyParts: [{author, text}]}
        const {
            story,
            isLoading,
            storyFinished,
            isDesktop,
            storyId,
        } = this.state;

        story.participants && this.shuffleArray(story.participants)
        const authors = story.participants && story.participants.map(participant => participant.email)
  
        const storyLink = `https://tellzy.web.app/story/${storyId}`;
        
        return (
            <div className="w-100">
                <Row>
                    <Col></Col>
                    <Col sm={8} className="h-100 px-sm-5 px-1">
                        <div>
                            {isLoading ? (
                                <p>Loading...</p>
                            ) : (
                                <div className="paper-wrap mt-5">
                                    <h2>{story.storyTitle}</h2>
                                    {storyFinished ? (
                                        <>
                                            <p>
                                                {story.storyParts.reduce(
                                                    (acc, curr) =>
                                                        acc + curr.text + "\n",
                                                    ""
                                                )}
                                            </p>
                                            <br />
                                            <div className="signature ml-auto">
                                                <p>
                                                    {story.storyParts.reduce(
                                                        (acc, curr) =>
                                                            acc +
                                                            curr.author +
                                                            "\n",
                                                        ""
                                                    )}
                                                </p>
                                            </div>
                                        </>
                                    ) : (
                                        <div>
                                            
                                            <p className="text-center prog">
                                                {story.participants.reduce(
                                                    (acc, curr) =>
                                                        (acc += curr.isSubmitted
                                                            ? 1
                                                            : 0),
                                                    0
                                                )}
                                                /{story.participants.length}{" "}
                                                have submitted
                                            </p>
                                            <p className="text-center">Story in progress... </p>
                                       
                                            <ul className="text-center">
                                                {authors.map(
                                                    (author) => (
                                                        <li
                                                            key={
                                                                author
                                                            }
                                                        >   
                                                            {author}
                                                            
                                                            {/* -{" "}
                                                            {participant.isSubmitted
                                                                ? "Submitted"
                                                                : "Awaiting"} */}
                                                            
                                                        </li>
                                                    )
                                                )}
                                           
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
                    <ShareButtons link={storyLink} story={story}></ShareButtons>
                </Row>
            </div>
        );
    }
}
