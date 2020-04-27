import React, { Component } from "react";
import { getStory } from "../../actions/io";
import Table from "react-bootstrap/Table";
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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Creator</th>
              <th>Number of participants</th>
              <th>Created on</th>
            </tr>
          </thead>

          <tbody>
            {storiesData.map(function (story, index) {
              return (
                <tr key={index} className="">
                  <td>{story.title}</td>
                  <td>by {story.createdBy.displayName}</td>
                  <td>With {story.participants.length} participants</td>
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
