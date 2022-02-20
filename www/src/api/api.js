import * as axios from 'axios'

const instance = axios.create({
    //withCredentials: true,    
    baseURL: 'http://description/src/php/index.php'

});

export const API = {
    loadtree(){
        return instance.get(`?action=get_categories`)
        .then(response => response.data)
    },
    loaddocument(id){
        return instance.get(`?action=load_text&id=`+id)
        .then(response => response.data)
    },
    loadcomment(){
        return instance.get(`?action=get_comment`)
        .then(response => response.data)
    },
    getcomment(FIO, text, data){
        return instance.get(`?action=set_comment&FIO=`+FIO+`&text=`+text+`&data=`+data)
        .then(response => response.data)        
    },
    loadTeg(){
        return instance.get(`?action=load_teg`)
        .then(response => response.data)        
    },
    loadInstructions(where){
        return instance.get(`?action=get_instruction&where=`+where)
        .then(response => response.data)        
    },
    getlastDocument(){
        return instance.get(`?action=get_lastdocument`)
        .then(response => response.data)        
    },
    addStatistic(id, category){
        return instance.get(`?action=get_statistic&id=`+id+`&category=`+category)
        .then(response => response.data)        
    }

    }