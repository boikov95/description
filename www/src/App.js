import React from "react";
import s from "./App.module.css";
import { Route, HashRouter } from "react-router-dom";
import HeaderComponent from "./component/Header/HeaderComponent.jsx";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { tree } from "./Redux/authreducer";
import TreeContainer from "./component/Tree/TreeContainer.jsx";
const DocumentContainer = React.lazy(() =>
  import("./component/Document/DocumentContainer.jsx")
);
import { compose } from "redux";
import InstructionsContainer from "./component/Instructions/InstructionsContainer.jsx";
import { withSuspect } from "./component/HOC/withSuspect.jsx";
import Scrollbars from "react-custom-scrollbars";
const CommentContainer = React.lazy(() =>
  import("./component/Comment/CommentContainer.jsx")
);

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
                render={withSuspect(DocumentContainer)}
              />
              <Route path="/comment" render={withSuspect(CommentContainer)} />
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

let mapStateToProps = (state) => ({
  loadtree: state.auth.tree,
});

export default compose(withRouter, connect(mapStateToProps, { tree }))(App);
