import React, { useState, useEffect, useRef } from "react";
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";
import { categoriesType } from "../../api/api.ts";
import { DocumentType } from "../../Redux/documentreducer.ts";
import s from "./Document.module.css";
import Pdf from "./PdfContainer/Pdf";

type DocumentTypeFC = {
  documentdata: Array<DocumentType>;
  loadtree: Array<categoriesType>;
  loadDocument: (id: number) => void;
  setDocumentFlag: (flag: boolean) => void;
  setParentDocumentText: (id: number) => void;
  addStatistic: (id: number) => void;
  Id: string;
};

const Document: React.FC<DocumentTypeFC & RouteComponentProps> = (props) => {
  const [child, setChild] = useState({
    textId: "",
    children: [] as Array<categoriesType>,
  });
  const childactive = useRef(false);

  const loadDocumentID = () => {
    if (!props.Id) {
      props.history.push("/instructions");
    } else {
      let IdName = props.loadtree.filter((element) => element.id === +props.Id);
      let parentTree = props.loadtree.filter(
        (element) => element.parent === props.Id
      );
      if (parentTree.length == 0) {
        props.loadDocument(+props.Id);
        props.setParentDocumentText(+props.Id);
        childactive.current = false;
      } else {
        props.setParentDocumentText(+props.Id);
        childactive.current = true;
        setChild({
          textId: IdName[0].text,
          children: parentTree,
        });
      }
    }
  };

  useEffect(() => {
    props.setDocumentFlag(true);
    loadDocumentID();
    return () => props.setDocumentFlag(false);
  }, []);

  useEffect(() => {
    loadDocumentID();
  }, [props.Id]);

  if (childactive.current)
    return (
      <ul className={s.nameParent}>
        {child.textId.toUpperCase() + ":"}
        {child.children.map((child) => (
          <li key={child.id} className={s.child}>
            <NavLink to={`/document/${child.id}`} className={s.nameChild}>
              {child.text}
            </NavLink>
          </li>
        ))}
      </ul>
    );

  return (
    <div>
      {props.documentdata.length ? (
        props.documentdata.map((element, index) => {
          return (
            <div className={s.documentisk} key={index}>
              <div className={s.documenttext}>{element.text}</div>
              {element.image.map((image, index) => (
                <img
                  key={index}
                  className={s.imageBD}
                  src={image.src}
                  title={image.nameimage}
                />
              ))}
              {element.pdf.length !== 0 && <Pdf pdf={element.pdf} />}
            </div>
          );
        })
      ) : (
        <div className={s.noDocument}>
          В базе данных отстутствует информация по выбранной Вами категории
        </div>
      )}
    </div>
  );
};

export default React.memo(Document);
