import React, { useRef, useState, useEffect } from "react";
import s from "./Header.module.css";
import DropdownMenu from "../Menu/DropdownMenu.jsx";
import ModalContainer from "../Modal/ModalContainer.jsx";

const Header = (props) => {
  const [country, setCountry] = useState(0);
  const [modal, setModal] = useState(false);
  const visibleModal = useRef(true);

  useEffect(() => {
    if (props.lastInstruction.length > 0 && visibleModal.current) {
      setModal(true);
      visibleModal.current = false;
    }
  }, [props.lastInstruction]);

  const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);
    useEffect(() => {
      if (didMount.current) func();
      else didMount.current = true;
    }, deps);
  };

  useDidMountEffect(() => {
    if (country != 0) {
      props.setCountryId("='" + country + "'");
    } else {
      props.setCountryId(" like '%'");
    }
  }, [country]);

  return (
    <div className={s.header}>
      {modal && (
        <ModalContainer
          active={modal}
          setActive={setModal}
          lastInstruction={props.lastInstruction}
          deleteInstructionID={props.deleteInstructionID}
        />
      )}
      <div className={s.flexblock}>
        <div className={s.blockSearch}>
          <DropdownMenu
            setActive={setModal}
            lastInstruction={props.lastInstruction}
          />
          <input
            placeholder="Введите страну для поиска"
            className={s.search}
            onChange={(e) => props.searchCountry(e.target.value)}
            value={props.value}
          />
        </div>
        <div className={s.blockdannie}>
          {props.flagInstructions &&
            props.tegi.map((element, index) => {
              return (
                <div
                  key={index}
                  className={s.tegi + " " + (element.flag ? s.active : "")}
                  onClick={() => props.setSearchTeg(element.name)}
                >
                  <span className={s.text}>{element.name}</span>
                </div>
              );
            })}
          {props.flagInstructions && (
            <input
              placeholder="Введите текст для поиска в указаниях"
              className={s.searchInstruction}
              onChange={(e) => props.setSearch(e.target.value)}
              value={props.search}
            />
          )}
          {props.flagInstructions && (
            <select
              value={country}
              className={s.list}
              id={props.id}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="0">Выберите страну</option>
              {props.tree.map((el) => {
                return (
                  <option key={el.id} value={el.id}>
                    {el.text}
                  </option>
                );
              })}
            </select>
          )}
          {props.flagDocument && (
            <span className={s.parentdocument}>
              Выбранная категория: {props.parentdocument}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
