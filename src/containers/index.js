import react, { lazy } from "react";
const Orden = lazy(() => import("./Orden"));
const Recibo = lazy(() => import("./Recibo"));
const Saldo = lazy(() => import("./Saldo"));
const Cliente = lazy(() => import("./Cliente"));
const Documento = lazy(() => import("./Documento"));
const Config = lazy(() => import("./Config"));
const Inicio = lazy(() => import("./Inicio"));
const Owner = lazy(() => import("./admin/Owner"));

//
//Add Apps HERE
export const Apps = {
  Orden,
  Owner,
  Recibo,
  Cliente,
  Config,
  Inicio,
  Saldo,
  Documento
};
//
//

export const Menu = {
  home: "Inicio",
  ventas: {
    owner: "Owner",
    orden: "Orden",
    recibo: "Recibo",
    cliente: "Cliente",
    saldo: "Saldo",
    documento: "Documento"
  }
};
