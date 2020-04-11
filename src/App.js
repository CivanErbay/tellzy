import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import Landing from "./Components/Landing";
import CreatingStory from "./Components/CreatingStory";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EditStory from "./Components/EditStory";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Navbar></Navbar>
            </header>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Landing />
                    </Route>
                    <Route exact path="/story">
                        <CreatingStory />
                    </Route>
                    <Route path="/story/:storyId">
                        <EditStory></EditStory>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
