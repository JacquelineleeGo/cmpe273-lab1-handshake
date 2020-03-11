import { configureStore,  getDefaultMiddleware } from "@reduxjs/toolkit";
import { routerMiddleware } from "connected-react-router";
 import { history } from "../../utils/history";

import rootReducer  from "./reducer";
const middleware = [
    routerMiddleware(history),
    ...getDefaultMiddleware()
];

const enhancers = [];

export default function configureAppStore(preloadedState){
    const store = configureStore({
        reducer: rootReducer,
        middleware,
        preloadedState,
        enhancers
    });

    if (process.env.NODE_ENV !== "production" && module.hot) {
        module.hot.accept("./reducer", () => store.replaceReducer(rootReducer));
      }
    
      return store;
}

