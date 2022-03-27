/* eslint-disable */
import { API } from "../api/api.ts";
import { InferActionTypes, ThunkTypeEnum } from "./redux-store.ts";

const actions = {
  getStatistic: (statistic: Array<statisticType>) =>
    ({ type: "GET_STATISTIC", statistic } as const),
};

let initialState = {
  statistic: [] as Array<statisticType>,
};

let statisticreducer = (
  state = initialState,
  action: ActionType
): initialStateType => {
  switch (action.type) {
    case "GET_STATISTIC":
      return {
        ...state,
        statistic: action.statistic,
      };
    default:
      return state;
  }
};

export const addStatistic =
  (id: number): ThunkTypeEnum<ActionType> =>
  async (dispatch, getState) => {
    await API.addStatistic(id, getState().document.parentdocument);
  };

export default statisticreducer;

type statisticType = {
  text: string;
};

type initialStateType = typeof initialState;
type ActionType = InferActionTypes<typeof actions>;
/* eslint-disable */
