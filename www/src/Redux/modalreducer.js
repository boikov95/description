import { API } from "../api/api";

const LAST_DOCUMENT = 'LAST_DOCUMENT';

export const lastDocument = (document) => ({ type:LAST_DOCUMENT, document});

let initialState = {    
    document: []
}

let modalreducer = (state = initialState, action) => {
    switch (action.type) {
        case LAST_DOCUMENT:
            return {
                ...state,
                document: action.document
            }       
        default: return state;
    }
}

export const getlastDocument = () =>
    async (dispatch) => {
        let data = await API.getlastDocument(); 
        debugger;
        if (data.code === "success") { 
        debugger;
        dispatch(lastDocument(data.result));        
        }        
    }  


export default modalreducer;