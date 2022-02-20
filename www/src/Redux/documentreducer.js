import { API } from "../api/api";

const SET_DOCUMENT = 'SET_DOCUMENT';
const SET_PARENTDOCUMENT = 'SET_PARENTDOCUMENT';

export const setDocument = (data) => ({ type: SET_DOCUMENT, data});
export const setParentDocument = (text) => ({ type: SET_PARENTDOCUMENT, text});

let initialState = {    
    documentdata: [],
    parentdocument: ""
}

let documentreducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DOCUMENT:
            return {
                ...state,
                documentdata: action.data
            }
        case SET_PARENTDOCUMENT:
            return {
                ...state,
                parentdocument: action.text
            }
        default: return state;
    }
}

export const loadDocument = (id) =>
    async (dispatch) => {
        let data = await API.loaddocument(id);
        debugger;
        let dataDocument =[];
        if (data.code === "success") {
            data.result.map((element)=>{
                dataDocument.push({"text":element.text, "image":[],"pdf":[]})                
                if (element.flag_image==="1"){
                    let count=1;
                    while(count<=element.count){
                        dataDocument[dataDocument.length-1].image.push({"src":"http://description/src/php/index.php?action=load_image&id="+id+"&idimage="+element.idimage+"&position="+count})  
                        count++
                    }
                }
                if (element.flag_pdf==="1"){
                    let count=1;
                    while(count<=element.countpdf){
                        dataDocument[dataDocument.length-1].pdf.push({"src":"http://description/src/php/index.php?action=load_pdf&id="+id+"&idpdf="+element.idimage+"&position="+count})  
                        count++
                    }
                }
            })            
            dispatch(setDocument(dataDocument));
        }
    }

export const setParentDocumentText = (id) => (dispatch, getState)=>{
    const search = getState().auth.tree.filter((el)=>el.id===id)    
    const searchAllParent = (id, parenttext)=>(
    getState().auth.tree.reduce((acc, item)=>{
        if (item.id===id && item.parent==="#") return item.text+"->"+acc;        
        if (item.id===id) return searchAllParent(item.parent, item.text+"->"+acc);   
        return acc;     
    }, parenttext)
    );     
    const searchParent = searchAllParent(search[0].parent, search[0].text);
    dispatch(setParentDocument(searchParent)); 
}

export default documentreducer;