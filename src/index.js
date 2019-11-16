import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import * as serviceWorker from "./serviceWorker";
import App from "@tbos/App";
import { StoreProvider } from "@tbos/business/hooks/useStore";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

// pick a date util library
import MomentUtils from "@date-io/moment";
//import { WebSocketLink } from "apollo-link-ws";
//import { persistCache } from "apollo-cache-persist";

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

ReactDOM.render(
  <CssBaseline>
    <div className="App">
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </MuiPickersUtilsProvider>
    </div>
  </CssBaseline>,
  document.getElementById("root")
);
