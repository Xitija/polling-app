import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { thunk } from "redux-thunk";
import pollsReducer from "./reducer/pollReducer";

const store = createStore(pollsReducer, applyMiddleware(thunk));

export default store;
