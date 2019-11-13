export const userInitialState = {
  user: {
    authorization: null,
    account: "development",
    loggedIn: false
  }
};

export const userActions = {
  init: (state, payload) => {
    let newUser = { ...state.user };
    var userJSON = window.localStorage.getItem("user");
    try {
      newUser = JSON.parse(userJSON);
    } catch (e) {
      console.log(e);
    }

    return { user: newUser };
  },
  login: (state, payload) => {
    const newUser = { ...state.user, ...payload, loggedIn: true };
    window.localStorage.setItem("user", JSON.stringify(newUser));
    return { user: newUser };
  },
  logout: state => {
    var anonUser = { loggedIn: false, authorization: null };

    window.localStorage.setItem("user", JSON.stringify(anonUser));
    return { user: anonUser };
  }
};
