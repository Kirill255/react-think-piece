import React, { Component } from "react";

class AddComment extends Component {
  state = { content: "", createdAt: null };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value, createdAt: new Date() });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onCreate(this.state);

    this.setState({ content: "", createdAt: null });
  };

  render() {
    const { content } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="AddComment">
        <input
          type="text"
          name="content"
          placeholder="Comment"
          value={content}
          onChange={this.handleChange}
        />
        <input className="create" type="submit" value="Create Comment" />
      </form>
    );
  }
}

export default AddComment;
