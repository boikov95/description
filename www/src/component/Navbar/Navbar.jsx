import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Friend from '../Friends/Friend';
import s from './Navbar.module.css';

const Navbar = (props) => {
    
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to='/profile' activeClassName={s.activeLink}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/dialogs' activeClassName={s.activeLink}>Message</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/news' activeClassName={s.activeLink}>News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/music' activeClassName={s.activeLink}>Music</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/settings' activeClassName={s.activeLink}>Settings</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/users' activeClassName={s.activeLink}>Users</NavLink>
            </div>
            <div>
                <Friend friend={props.friend} />
            </div>
        </nav>
    )
}

export default Navbar;