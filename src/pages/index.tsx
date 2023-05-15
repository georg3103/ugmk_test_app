import React, { lazy } from "react";
import { Route, Switch, Redirect} from "react-router-dom";

const DashboardPage = lazy(() => import("./dashboard"));
const DetailsPage = lazy(() => import("./details"));

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/" component={DashboardPage} />
      <Route exact path="/details/:factory/:month" component={DetailsPage} />
      <Redirect to={"/"} />
    </Switch>
  );
};

export default Routing;