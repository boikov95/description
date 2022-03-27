import {
  Action,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from "redux";
import authreducer from "./authreducer.ts";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import documentreducer from "./documentreducer.ts";
import headerreducer from "./headerreducer.ts";
import commentreducer from "./commentreducer.ts";
import instructionsreducer from "./instructionsreducer.ts";
import modalreducer from "./modalreducer.ts";
import statisticreducer from "./statisticreducer.ts";

let reducers = combineReducers({
  auth: authreducer,
  document: documentreducer,
  header: headerreducer,
  comment: commentreducer,
  instructions: instructionsreducer,
  modal: modalreducer,
  statistic: statisticreducer,
  form: formReducer,
});

export type InferActionTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;

export type ThunkTypeEnum<A extends Action, R = Promise<void>> = ThunkAction<
  R,
  AppStateType,
  unknown,
  A
>;

type reducersType = typeof reducers;
export type AppStateType = ReturnType<reducersType>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
