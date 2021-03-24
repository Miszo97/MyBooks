import React, { Component } from "react";
import { render } from "react-dom";
import {AppBar ,Toolbar } from "@material-ui/core";
import HomePage from "./HomePage";
import Link from '@material-ui/core/Link';


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Link href="#">
              Link
            </Link>
          </Toolbar>
        </AppBar>
        <HomePage/>
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
