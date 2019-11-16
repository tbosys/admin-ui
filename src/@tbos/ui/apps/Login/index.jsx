import React from "react";

import Login from "./views/login";
import Register from "./views/register";
import Code from "./views/code";
import { DataCode, DataLogin, DataRegister } from "./dataAccess";
import { withRouter, link } from "react-router-dom";
import { CircularProgress, Box } from "@material-ui/core";
import useMutation from "@tbos/ui/business/hooks/useMutation";
import { useStore } from "@tbos/ui/business/hooks/useStore";

const LOGIN_WITH_EMAIL = {
  path: "crm/login/login"
};

const LOGIN_WITH_CODE = {
  path: "crm/login/code"
};

function LoginContainer(props) {
  const { globalState, dispatch } = useStore();
  var [state, setState] = React.useState({ view: "LOGIN", values: {} });

  let [value, setValue] = React.useState("");
  const loginWithEmailMutation = useMutation(LOGIN_WITH_EMAIL);
  const loginWithCodeMutation = useMutation(LOGIN_WITH_CODE);

  function onChangeView(view) {
    return (values = {}) => {
      return setState({ view: view, values: { ...state.values, values } });
    };
  }

  function onIngresar(email) {
    var newState = { ...state, view: "LOADING" };
    setState(newState);

    return loginWithEmailMutation
      .mutate({
        email: email
      })
      .then(data => {
        var newState = {
          ...state,
          view: "CODE",
          values: { ...state.values, email: email }
        };
        setState(newState);
      })
      .catch(e => {
        debugger;
        if (e == 404) {
          var newState = {
            ...state,
            view: "REGISTER",
            values: { ...state.values, email: email }
          };
          setState(newState);
        }
      });
  }

  function onRegister(user) {
    var newState = { ...state, view: "LOADING" };
    setState(newState);

    DataRegister(user).then(() => {
      setState({ ...state, values: { ...state.values, email: user.email } });
      onChangeView("CODE")();
    });
  }

  function onCode(code) {
    var newState = { ...state, view: "LOADING" };
    setState(newState);

    return loginWithCodeMutation
      .mutate({
        email: state.values.email,
        code: code
      })
      .then(data => {
        var user = {};
        try {
          user = JSON.parse(atob(data.authorization.split(".")[1]));
        } catch (e) {
          return null;
        }

        dispatch({
          type: "login",
          payload: { user: user, authorization: data.authorization }
        });
        onChangeView("LOADING")();

        props.history.push("/inicio");
      })
      .catch(e => {
        debugger;
      });
  }

  if (state.view == "LOADING")
    return (
      <Box m={4}>
        <CircularProgress number={100} />
      </Box>
    );
  else if (state.view == "LOGIN")
    return (
      <Login onIngresar={onIngresar} onChangeView={onChangeView("REGISTER")} />
    );
  else if (state.view == "REGISTER")
    return (
      <Register
        email={state.values.email}
        onRegister={onRegister}
        onChangeView={onChangeView("LOGIN")}
      />
    );
  else if (state.view == "CODE")
    return (
      <Code
        email={state.values.email}
        onCode={onCode}
        onChangeView={onChangeView("CODE")}
      />
    );
}

function LoginContainerFullScreen(props) {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}>
      <LoginContainer {...props} />
    </div>
  );
}

export default withRouter(LoginContainerFullScreen);
