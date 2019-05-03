import React, { Component } from "react";

import Authentication from "./components/Authentication";
import Posts from "./components/Posts";

import { firestore } from "./firebase";
import { collectIdsAndDocs } from "./utilities";

class Application extends Component {
  unsubscribe = null;

  state = {
    posts: [],
    user: null
  };

  async componentDidMount() {
    // subscribing to changes
    this.unsubscribe = firestore.collection("posts").onSnapshot((snapshot) => {
      const posts = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ posts });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { user, posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication user={user} />
        <Posts posts={posts} />
      </main>
    );
  }
}

export default Application;
