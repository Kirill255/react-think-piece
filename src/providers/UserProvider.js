import React, { Component, createContext } from "react";

import { auth, createUserProfileDocument } from "../firebase";

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  unsubscribeFromAuth = null;

  state = { user: null };

  // прежде мы подписывались только на изменения при событии auth (sigIn/signOut), теперь нам также нужно подписаться на изменения в самом стейте(объекте) Auth, тоесть когда в нём изменяются, например displayName (или другие поля), для того чтобы данные обновлялись без необходимости перезагружать страницу при изменении данных в UserProfile
  async componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapshot) => {
          this.setState({ user: { uid: snapshot.id, ...snapshot.data() } });
        });
      }

      this.setState({ user: userAuth });
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
