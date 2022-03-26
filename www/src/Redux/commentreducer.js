import { API } from "../api/api";

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";

export const setComment = (comment) => ({ type: SET_COMMENT, comment });
export const addComment = (comment) => ({ type: ADD_COMMENT, comment });

let initialState = {
  comment: [],
};

let commentreducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENT:
      return {
        ...state,
        comment: action.comment,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comment: [action.comment, ...state.comment],
      };
    default:
      return state;
  }
};

export const getcomment = () => async (dispatch) => {
  let data = await API.loadcomment();
  if (data.code === "success") {
    dispatch(setComment(data.result));
  }
};

export const addcommentBD = (formData) => async (dispatch) => {
  const date = new Date().toLocaleString().substring(0, 17).replace(",", "");
  let data = await API.getcomment(formData.FIO, formData.text, date);
  if (data.code === "success") {
    dispatch(
      addComment({
        name: formData.FIO,
        text: formData.text,
        date_add: date,
        visible: true,
      })
    );
  }
};

export default commentreducer;
