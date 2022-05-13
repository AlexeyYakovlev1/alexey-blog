import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import postsReducer from "./reducers/posts.reducer";
import tagsReducer from "./reducers/tags.reducer";
import userReducer from "./reducers/user.reducer";

const store = createStore(combineReducers({
    user: userReducer, posts: postsReducer, tags: tagsReducer
}), composeWithDevTools(applyMiddleware(thunk)));

export default store;