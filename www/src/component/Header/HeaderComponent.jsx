import React from "react";
import { connect } from "react-redux";
import Header from "./Header.jsx";
import { searchCountry } from "../../Redux/headerreducer";
import {
  setCountryId,
  setSearch,
  setSearchTeg,
} from "../../Redux/instructionsreducer";
import { loadCountryInstructions } from "../../Redux/userSelector";
import { deleteInstructionID, getlastDocument } from "../../Redux/modalreducer";

class HeaderComponent extends React.Component {
  componentDidMount() {
    this.props.getlastDocument();
  }

  render() {
    return <Header {...this.props} />;
  }
}

let mapStateToProps = (state) => {
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

export default connect(mapStateToProps, {
  searchCountry,
  setSearchTeg,
  setSearch,
  setCountryId,
  getlastDocument,
  deleteInstructionID,
})(HeaderComponent);
