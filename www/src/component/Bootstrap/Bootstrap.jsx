import React, { useEffect, useState } from 'react'
import s from './Bootstrap.module.css';
import instructions from '../../photo/instructions.png'
import comment from '../../photo/comment.png'
import newphoto from '../../photo/newphoto.png'
import { NavLink } from 'react-router-dom';
import ModalContainer from '../Modal/ModalContainer';

const Bootstrap = (props) => {
    const [modal, setModal] = useState(false);
    //const [updateModal, setupdateModal] = useState(false);

    useEffect(() => {
        if (props.lastInstruction.length > 0) {
            setModal(true);
        }
    }, [props.lastInstruction])

    useEffect(() => {
        props.getlastDocument();
    }, [])

    console.log(modal);

    return (
        <div>
            <NavLink to={"/instructions"} activeClassName={s.activeLink} >
                <div className={s.instructions}>
                    <img className={s.photoinstructions} src={instructions} />
                    <span className={s.text}>Указания</span>
                </div>
            </NavLink>
            <NavLink to={"/comment"} activeClassName={s.activeLink} >
                <div className={s.instructions}>
                    <img className={s.photoinstructions} src={comment} />
                    <span className={s.text}>Комментарии</span>
                </div>
            </NavLink>
            {/* <NavLink to={"/statistic"} activeClassName={s.activeLink} >
        <div className={s.instructions}>
            <img className={s.photoinstructions} src={statis} />
            <span className={s.text}>Статистика</span>
        </div>
        </NavLink> */}
            {props.lastInstruction.length != 0 &&
                <img onClick={() => setModal(true)} className={s.newinstructions} src={newphoto} />}
            <ModalContainer active={modal} setActive={setModal} lastInstruction={props.lastInstruction} />
        </div>


    )
}

export default Bootstrap