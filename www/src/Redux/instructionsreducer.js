import { API } from "../api/api";

const SET_TEGI= 'SET_TEGI';
const SET_INSTRUCTIONS = 'SET_INSTRUCTIONS';
const ADD_INSTRUCTIONS = 'ADD_INSTRUCTIONS';
const SET_SEARCHTEG = 'SET_SEARCHTEG';
const SEARCH = 'SEARCH';

export const getTegi = (tegi) => ({ type:SET_TEGI, tegi});
export const getInstructions = (instructions) => ({ type:SET_INSTRUCTIONS, instructions});
export const addInstructions = (instructions) => ({ type:ADD_INSTRUCTIONS, instructions});
export const setSearchTeg = (teg) => ({ type:SET_SEARCHTEG, teg});
export const setSearch = (search) => ({ type:SEARCH, search});

let initialState = {    
    tegi: [],
    instructions: [],
    search: ""
}

let instructionsreducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TEGI:
            return {
                ...state,
                tegi: action.tegi
            }  
        case SEARCH:
            return{
                ...state,
                search: action.search
            }          
        case SET_INSTRUCTIONS:
            return {
                ...state,
                instructions: action.instructions
            }
        case ADD_INSTRUCTIONS:
                return {
                    ...state,
                    instructions: [...state.instructions, ...action.instructions]
                }    
        case SET_SEARCHTEG:
                return {
                    ...state,
                    // searchTegi: [...state.searchTegi, action.teg]
                    tegi: state.tegi.map(element => {if (element.name ===action.teg) 
                        return {"name":element.name, flag:!element.flag} 
                        return element
                    })
                }    
        default: return state;
    }
}

export const loadTeg = () =>
    async (dispatch) => {
        let data = await API.loadTeg(); 
        if (data.code === "success") { 
        dispatch(getTegi(data.result));        
        }        
    }   

export const loadInstructions = (where) =>
    async (dispatch) => {
        let data = await API.loadInstructions(where);                
        if (data.code === "success") { 
        dispatch(getInstructions(data.result));        
        }        
    }     

export const addInstructionsNew = (where) =>
    async (dispatch) => {
        let data = await API.loadInstructions(where);   
        if (data.code === "success") { 
        dispatch(addInstructions(data.result));        
        }        
    }     


    


export default instructionsreducer;