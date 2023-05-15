import React from "react";
import { Provider } from "react-redux";
import { appStore } from "../appStore";

const withStore = (component: () => React.ReactNode) => () =>
  <Provider store={appStore}>{component()}</Provider>;

export default withStore;