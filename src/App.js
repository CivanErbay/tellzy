import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import Landing from "./Components/Landing";
import CreatingStory from "./Components/CreatingStory";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditStory from "./Components/EditStory";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <Navbar></Navbar>
      </header> */}
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/story" component={CreatingStory} />
          <Route path="/story/:storyId/:secret" component={EditStory} />
          <Route path="/story/:storyId" component={EditStory} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
