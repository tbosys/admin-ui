import react, { lazy } from "react";

const orden = lazy(() => import("./Orden"));
const recibo = lazy(() => import("./Recibo"));
const saldo = lazy(() => import("./Saldo"));
const cliente = lazy(() => import("./Cliente"));
const documento = lazy(() => import("./Documento"));
const config = lazy(() => import("./Config"));
const inicio = lazy(() => import("./Inicio"));
const owner = lazy(() => import("./admin/Owner"));

//

//Add Apps HERE
export const Apps = {
  "": inicio,
  owner,
  home: inicio,
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
