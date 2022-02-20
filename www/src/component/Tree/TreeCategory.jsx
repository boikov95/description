import React, { useEffect } from 'react';
import { useState } from 'react';
import s from './Tree.module.css';
import child from '../../photo/41px.png'
import { NavLink } from 'react-router-dom';


const TreeCategory = (props) => {  


    return (
        <ul className={s.d_tree_container}>  
            {props.loadtree.map(tree => (
                <TreeNode key={tree.id} node={tree} />
            ))}
        </ul>
    )
}

const TreeNode = (props) => {
    const [childVisible, setChildVisible] = useState(false);
    const hasChild = props.node.children.length ? true : false;
    

    return (        
            <li className={s.d_tree_node}>                
                <NavLink to={`/document/${props.node.id}`} activeClassName={s.activeLink} >
                <div className={s.uzel} onClick={e => setChildVisible(v => !v)}>
                    {hasChild && (
                        <div className={s.d_photochild + " " + (childVisible ? s.active : "")}>
                            <img className={s.photochild} src={child} />
                        </div>
                    )}

                    <div className={s.col + " " + (!hasChild && s.cdvig)}>
                            <img className={s.country} src={props.node.photo} />
                        {props.node.text}
                    </div>
                </div>
                </NavLink>
                {
                    hasChild && childVisible &&                    
                        <TreeCategory loadtree={props.node.children} />                    
                }                
            </li>
       

    )
}

export default TreeCategory;