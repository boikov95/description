import React from "react";
import { connect } from "react-redux";
import s from "./Instructions.module.css";
import { actions } from "../../Redux/authreducer.ts";
import {
  addInstructionsNew,
  loadInstructions,
  loadTeg,
} from "../../Redux/instructionsreducer.ts";
import { instructionsSelector } from "../../Redux/userSelector.ts";
import Instructions from "./Instructions.tsx";
import { AppStateType } from "../../Redux/redux-store.ts";
import { instructionsType } from "../../api/api.ts";

type MapStateToPropsType = {
  instructions: Array<instructionsType>;
  instructionsId: string;
  dateInstruction: instructionsType;
};

type MapDispatchToPropsType = {
  loadTeg: () => void;
  setFlag: (flag: boolean) => void;
  loadInstructions: (where: string) => void;
  addInstructionsNew: (where: string) => void;
};

class InstructionsContainer extends React.Component<
  MapStateToPropsType & MapDispatchToPropsType
> {
  componentDidMount() {
    this.props.loadTeg();
    this.props.setFlag(true);
    this.props.loadInstructions("a.id" + this.props.instructionsId);
  }
  componentDidUpdate(prevProps: MapStateToPropsType & MapDispatchToPropsType) {
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

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    instructions: instructionsSelector(state),
    instructionsId: state.instructions.instructionsId,
    dateInstruction:
      state.instructions.instructions[
        state.instructions.instructions.length - 1
      ],
  };
};

export default connect<
  MapStateToPropsType,
  MapDispatchToPropsType,
  {},
  AppStateType
>(mapStateToProps, {
  loadTeg,
  setFlag: actions.setFlag,
  loadInstructions,
  addInstructionsNew,
})(InstructionsContainer);
