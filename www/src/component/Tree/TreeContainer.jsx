import React from "react";
import { connect } from "react-redux";
import TreeCategory from "./TreeCategory.jsx";
import tooglephoto from "../../photo/loading.gif";
import { tree } from "../../Redux/authreducer";
import s from "./Tree.module.css";
import { loadTree } from "../../Redux/userSelector";
import { Scrollbars } from "react-custom-scrollbars";

class TreeComponent extends React.Component {
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

let mapStateToProps = (state) => {
  return {
    loadtree: loadTree(state),
    search: state.header.search,
  };
};

export default connect(mapStateToProps, { tree })(TreeComponent);
