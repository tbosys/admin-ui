import React, { lazy } from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import * as serviceWorker from "./serviceWorker";
import App from "@tbos/ui";
import { StoreProvider } from "@tbos/ui/business/hooks/useStore";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import "./index.css";

serviceWorker.unregister();

const config = lazy(() => import("@tbos/ui/apps/Config"));
const home = lazy(() => import("@tbos/ui/apps/Home"));
const owner = lazy(() => import("@tbos/ui/apps/admin/Owner"));

//Add Apps HERE
export const apps = {
  "": home,
  home: home,
  owner,
  config,
  rol: ["id", { key: "table", extends: "string" }],
  profile: [
    "id",
    { key: "name", extends: "name" },
    { key: "description", extends: "text" }
  ]
};
//

export const menu = {
  home: "Inicio",
  admin: {
    owner: "User",
    rol: "Rol",
    profile: "Profile"
  }
};

ReactDOM.render(
  <CssBaseline>
    <div className="App">
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <StoreProvider>
          <App apps={apps} menu={menu} />
        </StoreProvider>
      </MuiPickersUtilsProvider>
    </div>
  </CssBaseline>,
  document.getElementById("root")
);
