import { API } from "../api/api";

const LAST_DOCUMENT = "LAST_DOCUMENT";
const DELETE_LAST_DOCUMENT = "DELETE_LAST_DOCUMENT";

export const lastDocument = (document) => ({ type: LAST_DOCUMENT, document });
export const deleteInstructionID = (id) => ({ type: DELETE_LAST_DOCUMENT, id });

let initialState = {
  document: [],
};

let modalreducer = (state = initialState, action) => {
  switch (action.type) {
    case LAST_DOCUMENT:
      return {
        ...state,
        document: action.document,
      };
    case DELETE_LAST_DOCUMENT:
      return {
        ...state,
        document: state.document.filter((el) => el.id != action.id),
      };
    default:
      return state;
  }
};

export const getlastDocument = () => async (dispatch) => {
  let data = await API.getlastDocument();
  if (data.code === "success") {
    dispatch(lastDocument(data.result));
  }
};

export default modalreducer;
