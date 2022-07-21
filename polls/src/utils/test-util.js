// Helper store for testing.
import { legacy_createStore as createStore } from "redux";
import combineReducers from "../reducers";
import applyMiddleware from "../middleware";

const store = createStore(combineReducers, applyMiddleware);

export default store;
