/* eslint-disable */
import { API, instructionsType, tegType } from "../api/api.ts";
import { InferActionTypes, ThunkTypeEnum } from "./redux-store.ts";

export const actions = {
  getTegi: (tegi: Array<tegType>) => ({ type: "SET_TEGI", tegi } as const),
  getInstructions: (instructions: Array<instructionsType>) =>
    ({
      type: "SET_INSTRUCTIONS",
      instructions,
    } as const),
  addInstructions: (instructions: Array<instructionsType>) =>
    ({
      type: "ADD_INSTRUCTIONS",
      instructions,
    } as const),
  setSearchTeg: (teg: string) => ({ type: "SET_SEARCHTEG", teg } as const),
  setSearch: (search: string) => ({ type: "SEARCH", search } as const),
  setCountryId: (id: string) => ({ type: "SET_COUNTRYID", id } as const),
};

let initialState = {
  tegi: [] as Array<tegType>,
  instructions: [] as Array<instructionsType>,
  search: "",
  instructionsId: " like '%'",
};

let instructionsreducer = (
  state = initialState,
  action: ActionType
): initialStateType => {
  switch (action.type) {
    case "SET_TEGI":
      return {
        ...state,
        tegi: action.tegi,
      };
    case "SEARCH":
      return {
        ...state,
        search: action.search,
      };
    case "SET_COUNTRYID":
      return {
        ...state,
        instructionsId: action.id,
      };
    case "SET_INSTRUCTIONS":
      return {
        ...state,
        instructions: action.instructions,
      };
    case "ADD_INSTRUCTIONS":
      return {
        ...state,
        instructions: [...state.instructions, ...action.instructions],
      };
    case "SET_SEARCHTEG":
      return {
        ...state,
        tegi: state.tegi.map((element) => {
          if (element.name === action.teg)
            return { name: element.name, flag: !element.flag };
          return element;
        }),
      };
    default:
      return state;
  }
};

export const loadTeg = (): ThunkTypeEnum<ActionType> => async (dispatch) => {
  let data = await API.loadTeg();
  if (data.code === "success") {
    dispatch(actions.getTegi(data.result));
  }
};

export const loadInstructions =
  (where: string): ThunkTypeEnum<ActionType> =>
  async (dispatch) => {
    let data = await API.loadInstructions(where);
    if (data.code === "success") {
      dispatch(actions.getInstructions(data.result));
    }
  };

export const addInstructionsNew =
  (where: string): ThunkTypeEnum<ActionType> =>
  async (dispatch) => {
    let data = await API.loadInstructions(where);
    if (data.code === "success") {
      dispatch(actions.addInstructions(data.result));
    }
  };

export default instructionsreducer;

type initialStateType = typeof initialState;
type ActionType = InferActionTypes<typeof actions>;
/* eslint-disable */
