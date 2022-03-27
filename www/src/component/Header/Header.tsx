import React, { useRef, useState, useEffect, ChangeEvent } from "react";
import s from "./Header.module.css";
import DropdownMenu from "../Menu/DropdownMenu.tsx";
import ModalContainer from "../Modal/ModalContainer.tsx";
import { categoriesType, lastDocumentType, tegType } from "../../api/api.ts";

type HeaderType = {
  value: string;
  tegi: Array<tegType>;
  flagInstructions: boolean;
  search: string;
  flagDocument: boolean;
  parentdocument: string;
  tree: Array<categoriesType>;
  lastInstruction: Array<lastDocumentType>;
  searchCountry: (search: string) => void;
  setSearchTeg: (teg: string) => void;
  setSearch: (search: string) => void;
  setCountryId: (id: string) => void;
  deleteInstructionID: (id: number) => void;
};

const Header: React.FC<HeaderType> = (props) => {
  const [country, setCountry] = useState(0);
  const [modal, setModal] = useState(false);
  const visibleModal = useRef(true);

  useEffect(() => {
    if (props.lastInstruction.length > 0 && visibleModal.current) {
      setModal(true);
      visibleModal.current = false;
    }
  }, [props.lastInstruction]);

  const useDidMountEffect = (func: any, deps: any) => {
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
              onChange={(e) => setCountry(+e.target.value)}
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
