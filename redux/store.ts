import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./reducers/user.reducer";

const store = createStore(combineReducers({
    user: userReducer
}), composeWithDevTools(applyMiddleware(thunk)));

export default store;