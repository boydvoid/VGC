import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  innerComponent: InnerComponent,
  loggedIn,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      loggedIn ? (
        <Component {...props}>
          <InnerComponent {...props} />
        </Component>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default ProtectedRoute;
