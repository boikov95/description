import { API } from "../api/api";

const GET_STATISTIC = 'GET_STATISTIC';

export const getStatistic = (statistic) => ({ type:GET_STATISTIC, statistic});

let initialState = {    
    statistic: []
}

let statisticreducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_STATISTIC:
            return {
                ...state,
                statistic: action.statistic
            }       
        default: return state;
    }
}

    
export const addStatistic = (id) =>
    async (dispatch, getState) => {
        await API.addStatistic(id, getState().document.parentdocument);    
    }      


export default statisticreducer;