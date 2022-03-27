import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { actions as b } from "../../Redux/headerreducer.ts";
import { actions as c } from "../../Redux/instructionsreducer.ts";
import { loadCountryInstructions } from "../../Redux/userSelector.ts";
import { actions as a, getlastDocument } from "../../Redux/modalreducer.ts";
import { AppStateType } from "../../Redux/redux-store.ts";
import { categoriesType, lastDocumentType, tegType } from "../../api/api.ts";

type MapStateToPropsType = {
  value: string;
  tegi: Array<tegType>;
  flagInstructions: boolean;
  search: string;
  flagDocument: boolean;
  parentdocument: string;
  tree: Array<categoriesType>;
  lastInstruction: Array<lastDocumentType>;
};

type MapDispatchToPropsType = {
  searchCountry: (search: string) => void;
  setSearchTeg: (teg: string) => void;
  setSearch: (search: string) => void;
  setCountryId: (id: string) => void;
  getlastDocument: () => void;
  deleteInstructionID: (id: number) => void;
};

class HeaderComponent extends React.Component<
  MapStateToPropsType & MapDispatchToPropsType
> {
  componentDidMount() {
    this.props.getlastDocument();
  }

  render() {
    return <Header {...this.props} />;
  }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    value: state.header.search,
    tegi: state.instructions.tegi,
    flagInstructions: state.auth.flagInstructions,
    search: state.instructions.search,
    flagDocument: state.auth.flagDocument,
    parentdocument: state.document.parentdocument,
    tree: loadCountryInstructions(state),
    lastInstruction: state.modal.document,
  };
};

export default connect<
  MapStateToPropsType,
  MapDispatchToPropsType,
  {},
  AppStateType
>(mapStateToProps, {
  searchCountry: b.searchCountry,
  setSearchTeg: c.setSearchTeg,
  setSearch: c.setSearch,
  setCountryId: c.setCountryId,
  getlastDocument,
  deleteInstructionID: a.deleteInstructionID,
})(HeaderComponent);
