//import { render } from "@testing-library/react";
import { API } from "../api/api";

const SET_TREE = "SET_TREE";
const FLAG_INSTRUCTION = "FLAG_INSTRUCTIONS";
const FLAG_DOCUMENT = "FLAG_DOCUMENT";

export const setTree = (tree) => ({ type: SET_TREE, tree });
export const setFlag = (flag) => ({ type: FLAG_INSTRUCTION, flag });
export const setDocumentFlag = (flag) => ({ type: FLAG_DOCUMENT, flag });

let initialState = {
  tree: [],
  flagInstructions: false,
  flagDocument: false,
};

let authreducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TREE:
      return {
        ...state,
        tree: action.tree,
      };
    case FLAG_INSTRUCTION:
      return {
        ...state,
        flagInstructions: action.flag,
      };
    case FLAG_DOCUMENT:
      return {
        ...state,
        flagDocument: action.flag,
      };
    default:
      return state;
  }
};

export const tree = () => async (dispatch) => {
  let data = await API.loadtree();
  if (data.code === "success") {
    dispatch(setTree(data.result));
  }
};

export default authreducer;
