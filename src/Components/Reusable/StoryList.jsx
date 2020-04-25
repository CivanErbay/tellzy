import React, { Component } from "react";

export default class StoryList extends Component {
    render() {
        const { heading, stories, nextUser } = this.props;
        return (
            <div>
                <h2>{heading}</h2>
                <ul>
                    {stories.map(function (story) {
                        return <li>{story.title}</li>;
                    })}
                </ul>
            </div>
        );
    }
}
