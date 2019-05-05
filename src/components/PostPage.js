import React, { Component } from "react";

import Post from "./Post";
import Comments from "./Comments";

import withUser from "../hoc/withUser";

import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utilities";

class PostPage extends Component {
  unsubscribeFromPost = null;
  unsubscribeFromComments = null;

  state = { post: null, comments: [] };

  async componentDidMount() {
    this.unsubscribeFromPost = this.postRef.onSnapshot((snapshot) => {
      const post = collectIdsAndDocs(snapshot);
      this.setState({ post });
    });

    this.unsubscribeFromComments = this.commentsRef.onSnapshot((snapshot) => {
      const comments = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ comments });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromPost();
    this.unsubscribeFromComments();
  }

  get postId() {
    return this.props.match.params.id;
  }

  get postRef() {
    return firestore.doc(`posts/${this.postId}`);
  }

  get commentsRef() {
    return this.postRef.collection("comments");
  }

  createComment = (comment) => {
    const { user } = this.props;
    this.commentsRef.add({ ...comment, user });
  };

  render() {
    // console.log(this.props); // т.к. это компонент роута, в пропс доступны history, location, match, теперь сдесь ещё user из withUser
    const { post, comments } = this.state;

    return (
      <section>
        {post && <Post {...post} />}
        <Comments comments={comments} onCreate={this.createComment} />
      </section>
    );
  }
}

export default withUser(PostPage);
