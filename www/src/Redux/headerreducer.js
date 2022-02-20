import { API } from "../api/api";

const SET_SEARCH = 'SET_SEARCH';

export const searchCountry = (search) => ({ type:SET_SEARCH, search});

let initialState = {    
    search: ""
}

let headerreducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH:
            return {
                ...state,
                search: action.search
            }
        default: return state;
    }
}

export default headerreducer;