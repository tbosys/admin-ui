import React, { lazy } from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import * as serviceWorker from "./serviceWorker";
import App from "@tbos/ui/App";
import { StoreProvider } from "@tbos/ui/business/hooks/useStore";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import "./index.css";

serviceWorker.unregister();

const config = lazy(() => import("@tbos/ui/apps/Config"));
const home = lazy(() => import("@tbos/ui/apps/Home"));
const owner = lazy(() => import("@tbos/ui/apps/admin/Owner"));
const report = lazy(() => import("@tbos/ui/apps/admin/Report"));
const table = lazy(() => import("@tbos/ui/apps/admin/Table"));

//Add Apps HERE
export const apps = {
  "": home,
  home,
  owner,
  table,
  config,
  report
};
//

ReactDOM.render(
  <CssBaseline>
    <div className="App">
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <StoreProvider>
          <App apps={apps} />
        </StoreProvider>
      </MuiPickersUtilsProvider>
    </div>
  </CssBaseline>,
  document.getElementById("root")
);
