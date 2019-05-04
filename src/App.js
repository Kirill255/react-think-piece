import React, { Component } from "react";

import Authentication from "./components/Authentication";
import Posts from "./components/Posts";

import { auth, firestore, createUserProfileDocument } from "./firebase";
import { collectIdsAndDocs } from "./utilities";

class Application extends Component {
  unsubscribeFromFirestore = null;
  unsubscribeFromAuth = null;

  state = {
    posts: [],
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

    this.unsubscribeFromFirestore = firestore.collection("posts").onSnapshot((snapshot) => {
      const posts = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ posts });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromFirestore();
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
