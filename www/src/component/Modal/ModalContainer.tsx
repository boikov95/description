import React from "react";
import { NavLink } from "react-router-dom";
import { lastDocumentType } from "../../api/api.ts";
import s from "./Modal.module.css";

type ModalContainerType = {
  active: boolean;
  setActive: (active: boolean) => void;
  lastInstruction: Array<lastDocumentType>;
  deleteInstructionID: (id: number) => void;
};

const ModalContainer: React.FC<ModalContainerType> = (props) => {
  return (
    <div
      className={s.modal + " " + (props.active ? s.active : "")}
      onClick={() => props.setActive(false)}
    >
      <div className={s.modal_content}>
        <ul className={s.parent}>
          В БД добавлена новая информация:
          {props.lastInstruction.map((el) => {
            return (
              <li
                onClick={() => props.deleteInstructionID(el.id)}
                key={el.id}
                className={s.child}
              >
                <NavLink to={`/document/${el.id}`}>
                  <span className={s.document}>{el.category}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div className={s.close}>Закрыть</div>
      </div>
    </div>
  );
};

export default ModalContainer;
