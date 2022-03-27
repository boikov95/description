/* eslint-disable */
import { InferActionTypes } from "./redux-store.ts";

export const actions = {
  searchCountry: (search: string) => ({ type: "SET_SEARCH", search } as const),
};

let initialState = {
  search: "",
};

let headerreducer = (
  state = initialState,
  action: ActionType
): initialStateType => {
  switch (action.type) {
    case "SET_SEARCH":
      return {
        ...state,
        search: action.search,
      };
    default:
      return state;
  }
};

export default headerreducer;

type initialStateType = typeof initialState;
type ActionType = InferActionTypes<typeof actions>;
/* eslint-disable */
