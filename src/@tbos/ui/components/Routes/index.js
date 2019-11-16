import React, { Suspense } from "react";

import { Route, Switch } from "react-router-dom";
import StandardContainer from "@tbos/ui/containers/StandardContainer";

export default function Routes(props) {
  const routes = [
    <Route exact key="base" path={"/login"} component={props.Login} />
  ];

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

    if (Array.isArray(App)) App = StandardContainer(lastKey, App);
    const route = `/: ${keys.map(key => key.toLowerCase()).join("/")}`;
    routes.push(
      <Route
        exact
        path={route}
        key={lastKey}
        render={renderProps => (
          <App toggleMenu={props.toggleMenu} {...renderProps} />
        )}
      />
    );
  }

  function recurseRoutes(menu, keys = []) {
    Object.keys(menu).forEach(rootKey => {
      var rootValue = menu[rootKey];

      if (typeof rootValue == "string") {
        pushToRoute(keys.concat([rootKey]));
      } else {
        recurseRoutes(rootValue, keys.concat([rootKey]));
      }
    });
  }

  recurseRoutes(props.menu);

  const catchRoute = <Route render={() => "404"} />;

  return <Switch>{routes.concat([catchRoute])}</Switch>;
}
