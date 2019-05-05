import React, { Component } from "react";

class PostPage extends Component {
  render() {
    console.log(this.props); // т.к. это компонент роута, в пропс доступны history, location, match
    const { match } = this.props;

    return (
      <div>
        <h2>Post Page {match.params.id}</h2>
      </div>
    );
  }
}

export default PostPage;
