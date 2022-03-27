import React from "react";
import { connect } from "react-redux";
import TreeCategory from "./TreeCategory.tsx";
import tooglephoto from "../../photo/loading.gif";
import { tree } from "../../Redux/authreducer.ts";
import s from "./Tree.module.css";
import { loadTree, usetree } from "../../Redux/userSelector.ts";
import { Scrollbars } from "react-custom-scrollbars";
import { AppStateType } from "../../Redux/redux-store.ts";

type MapStateToPropsType = {
  loadtree: Array<usetree>;
  search: string;
};

type MapDispatchToPropsType = {
  tree: () => void;
};

class TreeComponent extends React.Component<
  MapStateToPropsType & MapDispatchToPropsType
> {
  componentDidMount() {
    this.props.tree();
  }

  render() {
    if (this.props.loadtree.length == 0)
      return (
        <nav className={s.nav}>
          <img className={s.photoload} src={tooglephoto} />
        </nav>
      );

    return (
      <nav className={s.nav}>
        <Scrollbars className={s.scrolling}>
          <div className={s.nav_block}>
            <TreeCategory
              loadtree={this.props.loadtree.filter(
                (u) =>
                  u.text
                    .toLowerCase()
                    .indexOf(this.props.search.toLowerCase()) != -1
              )}
            />
          </div>
        </Scrollbars>
      </nav>
    );
  }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    loadtree: loadTree(state),
    search: state.header.search,
  };
};

export default connect<
  MapStateToPropsType,
  MapDispatchToPropsType,
  {},
  AppStateType
>(mapStateToProps, { tree })(TreeComponent);
