import React, { Component } from "react";

import Posts from "./components/Posts";

import { firestore } from "./firebase";
import { collectIdsAndDocs } from "./utilities";

class Application extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const snapshot = await firestore.collection("posts").get();

    const posts = snapshot.docs.map(collectIdsAndDocs);

    // console.log({ posts });
    this.setState({ posts });
  }

  handleCreate = (post) => {
    const { posts } = this.state;
    this.setState({ posts: [post, ...posts] });
  };

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts posts={posts} onCreate={this.handleCreate} />
      </main>
    );
  }
}

export default Application;
