import React, { Component } from "react";

import Authentication from "./components/Authentication";
import Posts from "./components/Posts";

class Application extends Component {
  render() {
    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication />
        <Posts />
      </main>
    );
  }
}

export default Application;
