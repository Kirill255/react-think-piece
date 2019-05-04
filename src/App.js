import React, { Component } from "react";

import Authentication from "./components/Authentication";
import Posts from "./components/Posts";

import { auth, createUserProfileDocument } from "./firebase";

class Application extends Component {
  unsubscribeFromAuth = null;

  state = {
    user: null
  };

  async componentDidMount() {
    // subscribing to changes
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // console.log(userAuth);
      const user = await createUserProfileDocument(userAuth);
      // console.log(user);
      this.setState({ user });
    });
  }

  render() {
    const { user } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication user={user} />
        <Posts />
      </main>
    );
  }
}

export default Application;
