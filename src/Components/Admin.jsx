import React, { Component } from "react";

export default class Admin extends Component {
  async getStory(storyId) {
    let storyRef = await db
      .collection("stories")
      .doc(storyId)
      .get()
      .catch(function (error) {
        console.log("Error getting document:", error);
        this.setState({ error: true });
      });

    if (storyRef.exists) {
      const story = storyRef.data();
      // check that secret is valid among participants
      const validParticipant = story.participants.filter(
        (participant) => participant.secret && this.state.secret === participant.secret
      )[0];

      // make hint text
      let hintText = story.storyParts.map((part) => part.text).join(" "); // join all parts
      const hintTextArray = hintText.split(" "); // split for every word
      // let hintText = "";
      if (validParticipant) {
        // get hint text to display
        if (hintTextArray.length > 50)
          hintText = hintTextArray.slice(hintTextSplit.length - 25, hintTextSplit.length).join(" ");
      }

      this.setState({
        story,
        isLoading: false,
        hintText,
        validParticipant,
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      this.setState({ error: true });
    }
  }

  render() {
    return <div></div>;
  }
}
