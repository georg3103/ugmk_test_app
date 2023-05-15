import { compose } from "shared";
import withRouter from "./with-router";
import WithStore from "./with-store";

export const withHocs = compose<Component>(WithStore, withRouter);
