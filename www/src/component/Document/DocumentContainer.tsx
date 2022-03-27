import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "redux";
import {
  DocumentType,
  loadDocument,
  setParentDocumentText,
} from "../../Redux/documentreducer.ts";
import Document from "./Document.tsx";
import s from "./Document.module.css";
import tooglephoto from "../../photo/loading.gif";
import { addStatistic } from "../../Redux/statisticreducer.ts";
import { AppStateType } from "../../Redux/redux-store.ts";
import { categoriesType } from "../../api/api.ts";
import { RouteComponentProps } from "react-router";
import { actions } from "../../Redux/authreducer.ts";

type MapStateToPropsType = {
  documentdata: Array<DocumentType>;
  loadtree: Array<categoriesType>;
};

type MapDispatchToPropsType = {
  loadDocument: (id: number) => void;
  setDocumentFlag: (flag: boolean) => void;
  setParentDocumentText: (id: number) => void;
  addStatistic: (id: number) => void;
};

type OwnPropsType = {
  Id: string;
};

class DocumentContainer extends React.Component<
  MapStateToPropsType &
    MapDispatchToPropsType &
    RouteComponentProps<OwnPropsType>
> {
  render() {
    if (this.props.loadtree.length === 0)
      return (
        <div>
          <img className={s.photoload} src={tooglephoto} />
        </div>
      );

    return (
      <div>
        <Document Id={this.props.match.params.Id} {...this.props} />
      </div>
    );
  }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    documentdata: state.document.documentdata,
    loadtree: state.auth.tree,
  };
};

export default compose<React.ComponentType>(
  connect<
    MapStateToPropsType,
    MapDispatchToPropsType,
    OwnPropsType,
    AppStateType
  >(mapStateToProps, {
    loadDocument,
    setDocumentFlag: actions.setDocumentFlag,
    setParentDocumentText,
    addStatistic,
  }),
  withRouter
)(DocumentContainer);
