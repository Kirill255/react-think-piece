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

  handleCreate = async (post) => {
    const { posts } = this.state;

    const docRef = await firestore.collection("posts").add(post); // создаст новый post в firestore
    const doc = await docRef.get(); // теперь нужно обновить состояние приложения, мы можем просто запрашивать каждый раз список всех постов, тоесть не только в componentDidMount, но и после handleCreate, однако мы можем сделать лучше, после содания поста, нам сразу возвращается ссылка на него, соответственно так мы можем получить наш только что созданный post

    const newPost = collectIdsAndDocs(doc);

    this.setState({ posts: [newPost, ...posts] }); // и потом добавить его в state
  };

  handleRemove = async (id) => {
    const { posts: allPosts } = this.state; // переименовали чтобы проще было сетстейтить

    await firestore.doc(`posts/${id}`).delete();

    const posts = allPosts.filter((post) => post.id !== id);

    this.setState({ posts });
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
