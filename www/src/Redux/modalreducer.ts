/* eslint-disable */
import { API, lastDocumentType } from "../api/api.ts";
import { InferActionTypes, ThunkTypeEnum } from "./redux-store.ts";

export const actions = {
  lastDocument: (document: Array<lastDocumentType>) =>
    ({ type: "LAST_DOCUMENT", document } as const),
  deleteInstructionID: (id: number) =>
    ({ type: "DELETE_LAST_DOCUMENT", id } as const),
};

let initialState = {
  document: [] as Array<lastDocumentType>,
};

let modalreducer = (
  state = initialState,
  action: ActionType
): initialStateType => {
  switch (action.type) {
    case "LAST_DOCUMENT":
      return {
        ...state,
        document: action.document,
      };
    case "DELETE_LAST_DOCUMENT":
      return {
        ...state,
        document: state.document.filter((el) => el.id != action.id),
      };
    default:
      return state;
  }
};

export const getlastDocument =
  (): ThunkTypeEnum<ActionType> => async (dispatch) => {
    let data = await API.getlastDocument();
    if (data.code === "success") {
      dispatch(actions.lastDocument(data.result));
    }
  };

export default modalreducer;

type initialStateType = typeof initialState;
type ActionType = InferActionTypes<typeof actions>;
/* eslint-disable */
