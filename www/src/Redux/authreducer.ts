//import { render } from "@testing-library/react";
/* eslint-disable */
import { categoriesType } from "../api/api.ts";
import { API } from "../api/api.ts";
import { InferActionTypes, ThunkTypeEnum } from "./redux-store.ts";

export const actions = {
  setTree: (tree: Array<categoriesType>) =>
    ({ type: "SET_TREE", tree } as const),
  setFlag: (flag: boolean) => ({ type: "FLAG_INSTRUCTION", flag } as const),
  setDocumentFlag: (flag: boolean) =>
    ({ type: "FLAG_DOCUMENT", flag } as const),
};

let initialState = {
  tree: [] as Array<categoriesType>,
  flagInstructions: false,
  flagDocument: false,
};

let authreducer = (
  state = initialState,
  action: ActionType
): initialStateType => {
  switch (action.type) {
    case "SET_TREE":
      return {
        ...state,
        tree: action.tree,
      };
    case "FLAG_INSTRUCTION":
      return {
        ...state,
        flagInstructions: action.flag,
      };
    case "FLAG_DOCUMENT":
      return {
        ...state,
        flagDocument: action.flag,
      };
    default:
      return state;
  }
};

export const tree = (): ThunkTypeEnum<ActionType> => async (dispatch) => {
  let data = await API.loadtree();
  if (data.code === "success") {
    dispatch(actions.setTree(data.result));
  }
};

export default authreducer;

type initialStateType = typeof initialState;
type ActionType = InferActionTypes<typeof actions>;
/* eslint-disable */
