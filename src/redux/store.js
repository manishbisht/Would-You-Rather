import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import login from '../pages/login/Reducer'

const middlewares = [thunk];

const rootReducer = combineReducers({
    login
});

export default createStore(rootReducer, {}, applyMiddleware(...middlewares));