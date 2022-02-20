import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import s from './Document.module.css';

const Document =(props)=>{
    const [child, setChild] = useState({
        "textId":"",
        "children":[]
    });
     const childactive = useRef(false);


    const loadDocumentID = () => {      
        
        if (!props.Id) {
            props.history.push('/instructions')
        }
        else {
            let IdName = props.loadtree.filter((element) => element.id === props.Id)
            let parentTree = props.loadtree.filter((element) => element.parent === props.Id);
            if (parentTree.length == 0) { 
                props.loadDocument(props.Id);
                props.setParentDocumentText(props.Id);      
                //clearTimeout(addStatistic);                        
                //var addStatistic = setTimeout(()=>{
                //    props.addStatistic(props.Id);
                //},9000);                                         
                childactive.current=false;
            }
            else {
                props.setParentDocumentText(props.Id);
                childactive.current=true;
                setChild({
                    textId: IdName[0].text,
                    children: parentTree,                    
                })
            }
        }        
    }
    
    useEffect (() =>{
        props.setDocumentFlag(true);
        loadDocumentID();
        return () => props.setDocumentFlag(false);
    },[])

    useEffect(()=>{
        loadDocumentID();
    },[props.Id])
    
    if (childactive.current)
            return (<ul className={s.nameParent}>{child.textId.toUpperCase() + ":"}
                {child.children.map(child =>
                <li key={child.id} className={s.child}>
                    <NavLink to={`/document/${child.id}`} className={s.nameChild} >
                        {child.text}
                    </NavLink>
                </li>)    
                }

            </ul>
            )    
    
    return(
        <div>
            {props.documentdata.length ?
            props.documentdata.map((element) => {
                return (
                    <div key={element.id}>
                        <div>{element.text}</div>
                        {element.image.map((image, index) => <img key={index} className={s.imageBD} src={image.src} />)}
                        {element.pdf.map((pdf, index) => <embed key={index} className={s.pdfBD} src={pdf.src} />)}
                    </div>
                    )
                }
            ) 
            :
            <div className={s.noDocument}>
                В базе данных отстутствует информация по выбранной Вами категории   
            </div>
            }
        </div>
    )



}

export default Document;