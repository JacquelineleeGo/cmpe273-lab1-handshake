import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { history } from "../../utils/history";
import { reducer as userReducer } from "../../pages/user/model";

import { reducer as globalReducer } from "./model";

const createRootReducer = history => 
    combineReducers ({
        router: connectRouter(history),
        global: globalReducer,
        user: userReducer,
})

const reducer = createRootReducer(history);

export default reducer;