import React, { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import s from './Modal.module.css';

const ModalContainer = (props) => {    

    return (
        <div className={s.modal + " " + (props.active ? s.active : "")} onClick={() => props.setActive(false)}>
            <div className={s.modal_content}>                 
                <ul className={s.parent}>
                    В БД добавлена новая информация:
                    {props.lastInstruction.map((el) => {
                        return (
                            <li className={s.child}>
                                <NavLink to={`/document/${el.id}`}>
                                    <span className={s.document}>{el.category}</span>
                                </NavLink>
                            </li>)
                    })}
                </ul>
                <div className={s.close}>Закрыть</div>
            </div>

        </div>

    )

}


//let mapStateToProps = (state) => {
//    return {
//        lastInstruction: state.modal.document
//    }

//}

//export default connect(mapStateToProps, { getlastDocument })(ModalContainer);
export default ModalContainer;