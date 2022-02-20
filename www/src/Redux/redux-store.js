import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import authreducer from "./authreducer";
import thunkMiddleware from "redux-thunk"
import {reducer as formReducer} from "redux-form"
import documentreducer from "./documentreducer";
import headerreducer from "./headerreducer";
import commentreducer from "./commentreducer";
import instructionsreducer from "./instructionsreducer";
import modalreducer from "./modalreducer";
import statisticreducer from "./statisticreducer";

let reducers =combineReducers({ 
    auth: authreducer,
    document: documentreducer,
    header: headerreducer,
    comment: commentreducer,
    instructions:instructionsreducer,
    modal: modalreducer,
    statistic: statisticreducer,
    form : formReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)
  ));



export default store;