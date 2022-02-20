import React, { useState } from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {

    return (
        <div className={s.header}>
            <input placeholder='Введите страну для поиска' className={s.search} onChange={(e) => props.searchCountry(e.target.value)} value={props.value} />
            <div className={s.blockdannie}>
                {props.flagInstructions &&
                    props.tegi.map(element => {
                        return (<div className={s.tegi + " " + (element.flag ? s.active : "")} onClick={(e) => props.setSearchTeg(element.name)}>
                            <span className={s.text}>{element.name}</span>
                        </div>)
                    })
                }
                {props.flagInstructions &&
                    <input placeholder='Введите текст для поиска в указаниях' className={s.searchInstruction} onChange={(e) => props.setSearch(e.target.value)} value={props.search} />
                }
                {props.flagDocument &&
                    <span className={s.parentdocument}>Выбранная категория: {props.parentdocument}</span>
                }
            </div>
        </div>
    )
}

export default Header;