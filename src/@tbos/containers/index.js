import react, { lazy } from "react";
const config = lazy(() => import("@tbos/containers/Config"));
const inicio = lazy(() => import("@tbos/containers/Inicio"));
const owner = lazy(() => import("@tbos/containers/admin/Owner"));

//

//Add Apps HERE
export const Apps = {
  "": inicio,
  home: inicio,
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

export const Menu = {
  home: "Inicio",
  admin: {
    owner: "User",
    rol: "Rol",
    profile: "Profile"
  }
};
