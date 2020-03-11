import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { history } from "../../utils/history";
import { reducer as globalReducer } from "./model";

const createRootReducer = history => 
    combineReducers ({
        router: connectRouter(history),
        global: globalReducer
})

const reducer = createRootReducer(history);

export default reducer;