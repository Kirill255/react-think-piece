import React, { Component } from "react";

import Posts from "./components/Posts";

import { firestore } from "./firebase";
import { collectIdsAndDocs } from "./utilities";

class Application extends Component {
  unsubscribe = null;

  state = {
    posts: []
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

  // т.к. мы подписались на изменения в database, теперь мы просто отправляем запросы add/delete, и состояние обновляется само
  handleCreate = async (post) => {
    await firestore.collection("posts").add(post);
  };

  handleRemove = async (id) => {
    await firestore.doc(`posts/${id}`).delete();
  };

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts posts={posts} onCreate={this.handleCreate} onRemove={this.handleRemove} />
      </main>
    );
  }
}

export default Application;
