/* eslint-disable */
import { API } from "../api/api.ts";
import { InferActionTypes, ThunkTypeEnum } from "./redux-store.ts";

const actions = {
  setComment: (comment: Array<commentType>) =>
    ({ type: "SET_COMMENT", comment } as const),
  addComment: (comment: commentType) =>
    ({ type: "ADD_COMMENT", comment } as const),
};

let initialState = {
  comment: [] as Array<commentType>,
};

let commentreducer = (
  state = initialState,
  action: ActionType
): initialStateType => {
  switch (action.type) {
    case "SET_COMMENT":
      return {
        ...state,
        comment: action.comment,
      };
    case "ADD_COMMENT":
      return {
        ...state,
        comment: [action.comment, ...state.comment],
      };
    default:
      return state;
  }
};

export const getcomment = (): ThunkTypeEnum<ActionType> => async (dispatch) => {
  let data = await API.loadcomment();
  if (data.code === "success") {
    dispatch(actions.setComment(data.result));
  }
};

export const addcommentBD =
  (formData: commentType): ThunkTypeEnum<ActionType> =>
  async (dispatch) => {
    const date = new Date().toLocaleString().substring(0, 17).replace(",", "");
    let data = await API.getcomment(formData.name, formData.text, date);
    if (data.code === "success") {
      dispatch(
        actions.addComment({
          name: formData.name,
          text: formData.text,
          date: date,
          visible: true,
        })
      );
    }
  };

export default commentreducer;

type initialStateType = typeof initialState;
type ActionType = InferActionTypes<typeof actions>;

export type commentType = {
  name: string;
  text: string;
  date: string;
  visible?: boolean;
};
/* eslint-disable */
