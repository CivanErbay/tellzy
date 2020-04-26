import React, { Component } from "react";
import { getStory } from "../../actions/io";
var moment = require("moment");

export default class StoryList extends Component {
  state = {
    storiesData: [],
  };

  componentDidMount = () => {
    const promises = this.props.stories.map((id) => getStory(id));
    Promise.all(promises).then((storiesData) => this.setState({ storiesData }));
  };

  render() {
    const { heading } = this.props;
    const { storiesData } = this.state;

    return (
      <div className="list-wrap">
        <h2>{heading}</h2>
        <ul>
          {storiesData.map(function (story, index) {
            return (
              <li key={index} className={"list-item d-flex justify-content-around"}>
                <h5>{story.title}</h5>
                <p>by {story.createdBy.displayName}</p>
                <p>With {story.participants.length} participants</p>
                {/* <p>Created on {moment(story.createdOn.seconds)}</p> */}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
