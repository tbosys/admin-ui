import React, { Suspense } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "components/Drawer";
import Login from "./containers/Login";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useStore } from "business/hooks/useStore";
import { hot } from "react-hot-loader/root";
import Routes from "components/Routes";
import { lazy } from "react";

import { Menu, Apps } from "containers";

function App(props) {
  const classes = useStyles();
  const { state, dispatch } = useStore();
  React.useEffect(() => {
    dispatch({ type: "init" });
  }, []);

  const [menuOpen, setMenuOpen] = React.useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <div className={classes.root}>
      <Router>
        <Drawer close={toggleMenu} open={menuOpen} menu={Menu} />

        <main className={classes.content}>
          {!state.user || !state.user.loggedIn ? (
            <Login />
          ) : (
            <Suspense fallback={<LoadingMessage />}>
              <Switch>
                <Routes Login={Login} toggleMenu={toggleMenu} menu={Menu} apps={Apps} />
              </Switch>
            </Suspense>
          )}
        </main>
      </Router>
    </div>
  );
}

export default process.env.NODE_ENV === "development" ? hot(App) : App;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    padding: 0
  },

  content: {
    flexShrink: 1,
    flexGrow: 1,
    height: "calc(100vh - 65px)",
    marginTop: 10
  }
}));

const LoadingMessage = () => "I'm loading...";
