import React, { useState } from "react";
import s from "./DropdownMenu.module.css";
import instructions from "../../photo/instructions.png";
import comment from "../../photo/comment.png";
import newphoto from "../../photo/newphoto.png";
import menu from "../../photo/menu.png";
import { NavLink } from "react-router-dom";
// import { Redirect } from "react-router-dom";

const DropdownMenu = (props) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={s.menu_container}>
      <img
        onClick={() => setIsActive(!isActive)}
        className={s.menu_trigger}
        src={menu}
        alt="Меню"
        title="Меню"
      />
      <nav className={s.menu + " " + (isActive ? s.active : "")}>
        <ul onClick={() => setIsActive(!isActive)}>
          <li>
            <NavLink to={"/instructions"} activeClassName={s.activeLink}>
              <div>
                <img src={instructions} />
                <span>Указания</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/comment"} activeClassName={s.activeLink}>
              <div>
                <img src={comment} />
                <span>Комментарии</span>
              </div>
            </NavLink>
          </li>
          {props.lastInstruction.length > 0 && (
            <li>
              <NavLink to={"/"} activeClassName={s.activeLink}>
                <div onClick={() => props.setActive(true)}>
                  <div className={s.infoCount}>
                    <img src={newphoto} />
                    <span className={s.countInstruction}>
                      {props.lastInstruction.length}
                    </span>
                  </div>
                  <span>Последние изменения</span>
                </div>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default DropdownMenu;
