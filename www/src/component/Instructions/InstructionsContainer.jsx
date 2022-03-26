import React from "react";
import { connect } from "react-redux";
import s from "./Instructions.module.css";
import { setFlag } from "../../Redux/authreducer";
import {
  addInstructionsNew,
  loadInstructions,
  loadTeg,
} from "../../Redux/instructionsreducer";
import { instructionsSelector } from "../../Redux/userSelector";
import Instructions from "./Instructions.jsx";

class InstructionsContainer extends React.Component {
  componentDidMount() {
    this.props.loadTeg();
    this.props.setFlag(true);
    this.props.loadInstructions("a.id" + this.props.instructionsId);
  }
  componentDidUpdate(prevProps) {
    if (this.props.instructionsId !== prevProps.instructionsId) {
      this.props.loadInstructions("a.id" + this.props.instructionsId);
    }
  }

  componentWillUnmount() {
    this.props.setFlag(false);
  }
  render() {
    if (this.props.instructions.length === 0)
      return (
        <div className={s.instr}>
          Указаний по данному(данным) фильтрам не найдено
        </div>
      );
    return <Instructions {...this.props} />;
  }
}

let mapStateToProps = (state) => {
  return {
    instructions: instructionsSelector(state),
    instructionsId: state.instructions.instructionsId,
    dateInstruction:
      state.instructions.instructions[
        state.instructions.instructions.length - 1
      ],
  };
};

export default connect(mapStateToProps, {
  loadTeg,
  setFlag,
  loadInstructions,
  addInstructionsNew,
})(InstructionsContainer);
