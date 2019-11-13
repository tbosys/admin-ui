import React, { Suspense } from "react";

import { Route } from "react-router-dom";

export default function Routes(props) {
  const routes = [<Route key="base" path={"/login"} component={props.Login} />];

  /*
    menu = {
  home: "inicio",
  ventas: {
    orden: "Orden",
    recibo: "Recibo",
    cliente: "Cliente"
  }
};
*/

  function pushToRoute(keys) {
    var lastKey = keys[keys.length - 1];
    var App = props.apps[lastKey];
    const route = `/${keys.map(key => key.toLowerCase()).join("/")}`;
    routes.push(
      <Route
        path={route}
        key={lastKey}
        render={renderProps => <App toggleMenu={props.toggleMenu} {...renderProps} />}
      />
    );
  }

  function recurseRoutes(menu, keys = []) {
    Object.keys(menu).forEach(rootKey => {
      var rootValue = menu[rootKey];

      if (typeof rootValue == "string") {
        pushToRoute(keys.concat([rootValue]));
      } else {
        recurseRoutes(rootValue, keys.concat([rootKey]));
      }
    });
  }

  recurseRoutes(props.menu);
  return routes;
}
