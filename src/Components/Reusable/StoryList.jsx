import React, { Component } from "react";
import { getStory } from "../../actions/io";
import Table from "react-bootstrap/Table";
import { Redirect } from "react-router-dom";
var moment = require("moment");

export default class StoryList extends Component {
  state = {
    storiesData: [],
  };

  componentDidMount = () => {
    const promises = this.props.stories.map((id) => getStory(id));
    Promise.all(promises).then((storiesData) => this.setState({ storiesData }));
  };

  handleRedirect = (story) => {
    console.log(story);
    return <Redirect to={`/story/${story.id}`} />;
  };

  render() {
    const { heading } = this.props;
    const { storiesData } = this.state;

    return (
      <div className="list-wrap">
        <h2>{heading}</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Creator</th>
              <th>Authors</th>
              <th>Created on</th>
            </tr>
          </thead>

          <tbody>
            {storiesData.map((story, index) => {
              return (
                <tr key={index} className="list-item" onClick={() => this.handleRedirect(story)}>
                  <td>{story.title}</td>
                  <td>by {story.createdBy.displayName}</td>
                  <td>{story.participants.map((participant) => participant.displayName)}</td>
                  <td>{moment(new Date(story.createdOn.toDate())).calendar()}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
