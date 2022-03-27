import React from "react";
import s from "./App.module.css";
import { Route, HashRouter } from "react-router-dom";
import HeaderComponent from "./component/Header/HeaderComponent.tsx";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { tree } from "./Redux/authreducer";
import TreeContainer from "./component/Tree/TreeContainer.tsx";
const DocumentContainer = React.lazy(
  () => import("./component/Document/DocumentContainer.tsx")
);
import { compose } from "redux";
import InstructionsContainer from "./component/Instructions/InstructionsContainer.tsx";
import { withSuspect } from "./component/HOC/withSuspect.tsx";
import Scrollbars from "react-custom-scrollbars";
import { AppStateType } from "./Redux/redux-store.ts";
import { categoriesType } from "./api/api.ts";
const CommentContainer = React.lazy(
  () => import("./component/Comment/CommentContainer.tsx")
);

type MapStateToPropsType = {
  loadtree: Array<categoriesType>;
};

const CommentContainerLazy = withSuspect(CommentContainer);
const DocumentContainerLazy = withSuspect(DocumentContainer);

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div className={s.wrapper}>
          <HeaderComponent />
          <TreeContainer />
          <div className={s.content}>
            <Scrollbars style={{ width: "100%", height: "100%" }}>
              <Route
                path="/document/:Id?"
                render={() => <DocumentContainerLazy />}
              />
              <Route path="/comment" render={() => <CommentContainerLazy />} />
              <Route
                path="/instructions"
                render={() => <InstructionsContainer />}
              />
            </Scrollbars>
          </div>
        </div>
      </HashRouter>
    );
  }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  loadtree: state.auth.tree,
});

export default compose(
  withRouter,
  connect<MapStateToPropsType, {}, {}, AppStateType>(mapStateToProps, {})
)(App);
