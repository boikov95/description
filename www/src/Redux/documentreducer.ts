/* eslint-disable */
import { ThunkAction } from "redux-thunk";
import { API, documentType } from "../api/api.ts";
import {
  AppStateType,
  InferActionTypes,
  ThunkTypeEnum,
} from "./redux-store.ts";

const actions = {
  setDocument: (data: Array<DocumentType>) =>
    ({ type: "SET_DOCUMENT", data } as const),
  setParentDocument: (text: string) =>
    ({ type: "SET_PARENTDOCUMENT", text } as const),
};

let initialState = {
  documentdata: [] as Array<DocumentType>,
  parentdocument: "",
};

let documentreducer = (
  state = initialState,
  action: ActionType
): initialStateType => {
  switch (action.type) {
    case "SET_DOCUMENT":
      return {
        ...state,
        documentdata: action.data,
      };
    case "SET_PARENTDOCUMENT":
      return {
        ...state,
        parentdocument: action.text,
      };
    default:
      return state;
  }
};

export const loadDocument =
  (id: number): ThunkTypeEnum<ActionType> =>
  async (dispatch) => {
    let data = await API.loaddocument(id);
    let dataDocument = [] as Array<DocumentType>;
    if (data.code === "success") {
      data.result.map((element: documentType) => {
        dataDocument.push({ text: element.text, image: [], pdf: [] });
        if (element.flag_image === 1) {
          let count = 1;
          while (count <= element.count) {
            dataDocument[dataDocument.length - 1].image.push({
              src:
                "http://description/src/php/index.php?action=load_image&id=" +
                id +
                "&idimage=" +
                element.idimage +
                "&position=" +
                count,
              nameimage: element.nameimage,
            });
            count++;
          }
        }
        if (element.flag_pdf === 1) {
          let count = 1;
          while (count <= element.countpdf) {
            dataDocument[dataDocument.length - 1].pdf.push({
              src:
                "http://description/src/php/index.php?action=load_pdf&id=" +
                id +
                "&idpdf=" +
                element.idimage +
                "&position=" +
                count,
            });
            count++;
          }
        }
      });
      dispatch(actions.setDocument(dataDocument));
    }
  };

export const setParentDocumentText =
  (id: number): ThunkTypeEnum<ActionType> =>
  (dispatch, getState): any => {
    const search = getState().auth.tree.filter((el) => el.id === id);
    const searchAllParent = (id: number | string, parenttext: string): string =>
      getState().auth.tree.reduce((acc, item) => {
        if (item.id === id && item.parent === "#")
          return item.text + "->" + acc;
        if (item.id === id)
          return searchAllParent(item.parent, item.text + "->" + acc);
        return acc;
      }, parenttext);
    const searchParent = searchAllParent(search[0].parent, search[0].text);
    dispatch(actions.setParentDocument(searchParent));
  };

export default documentreducer;

type initialStateType = typeof initialState;
type ActionType = InferActionTypes<typeof actions>;

type imagedataType = {
  src: string;
  nameimage: string;
};

export type pdfdataType = {
  src: string;
};

export type DocumentType = {
  text: string;
  image: Array<imagedataType>;
  pdf: Array<pdfdataType>;
};
/* eslint-disable */
