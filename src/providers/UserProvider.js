import React, { Component, createContext } from "react";

import { auth, createUserProfileDocument } from "../firebase";

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  unsubscribeFromAuth = null;

  state = { user: null };

  async componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      const user = await createUserProfileDocument(userAuth);
      this.setState({ user });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { user } = this.state;
    const { children } = this.props;

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  }
}

export default UserProvider;
