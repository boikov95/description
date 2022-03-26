import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "redux";
import {
  loadDocument,
  setParentDocumentText,
} from "../../Redux/documentreducer";
import Document from "./Document.jsx";
import s from "./Document.module.css";
import tooglephoto from "../../photo/loading.gif";
import { setDocumentFlag } from "../../Redux/authreducer";
import { addStatistic } from "../../Redux/statisticreducer";

class DocumentContainer extends React.Component {
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

let mapStateToProps = (state) => {
  return {
    documentdata: state.document.documentdata,
    loadtree: state.auth.tree,
  };
};

export default compose(
  connect(mapStateToProps, {
    loadDocument,
    setDocumentFlag,
    setParentDocumentText,
    addStatistic,
  }),
  withRouter
)(DocumentContainer);
