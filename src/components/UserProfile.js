import React, { Component } from "react";

import { auth, firestore, storage } from "../firebase";

class UserProfile extends Component {
  imageInput = null;

  state = { displayName: "" };

  get uid() {
    return auth.currentUser.uid;
  }

  get userRef() {
    return firestore.doc(`users/${this.uid}`);
  }

  get file() {
    return this.imageInput && this.imageInput.files[0];
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { displayName } = this.state;

    if (displayName) {
      this.userRef.update({ displayName });
    }

    // gs://react-think-piece-a2506.appspot.com/user-profiles/GhF0pYwivre0QLGGCSxViXWN8Mi1/Halk.jpg
    if (this.file) {
      storage
        .ref()
        .child("user-profiles")
        .child(this.uid)
        .child(this.file.name)
        .put(this.file)
        .then((response) => response.ref.getDownloadURL())
        .then((photoURL) => this.userRef.update({ photoURL }));
    }
  };

  render() {
    const { displayName } = this.state;

    return (
      <section className="UserProfile">
        <form onSubmit={this.handleSubmit} className="UpdateUser">
          <input
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Display Name"
            onChange={this.handleChange}
          />
          <input type="file" ref={(c) => (this.imageInput = c)} />
          <input className="update" type="submit" value="Update" />
        </form>
      </section>
    );
  }
}

export default UserProfile;
