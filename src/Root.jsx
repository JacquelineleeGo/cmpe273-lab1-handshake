import React from "react";
import { Provider } from "react-redux";
import { history } from "./utils/history";
import { ConnectedRouter } from "connected-react-router";

import Routes from "./common/routes";

export default function Root(props) {
    return (
        <Provider store={props.store}>
        <ConnectedRouter history={history}>
        <Routes />
        </ConnectedRouter>
        </Provider>
    );
}