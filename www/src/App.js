import React from 'react';
import s from './App.module.css';
import { Route } from 'react-router-dom';
import HeaderComponent from './component/Header/HeaderComponent';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { tree } from './Redux/authreducer';
import TreeContainer from './component/Tree/TreeContainer';
import DocumentContainer from './component/Document/DocumentContainer';
import { compose } from 'redux';
import { HashRouter } from 'react-router-dom';
import BootstrapContainer from './component/Bootstrap/BootstrapContainer';
import InstructionsContainer from './component/Instructions/InstructionsContainer';
import { withSuspect } from './component/HOC/withSuspect';
const CommentContainer = React.lazy(() => import('./component/Comment/CommentContainer'));

class App extends React.Component {

  render() {

    return (
      <HashRouter>
        <div className={s.wrapper}>
          <BootstrapContainer />
          <HeaderComponent />
          <TreeContainer />
          <div className={s.content}>
            <Route path='/document/:Id?' render={() => <DocumentContainer />} />
            <Route path='/comment' render={withSuspect(CommentContainer)} />
            <Route path='/instructions' render={() => <InstructionsContainer />} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

let mapStateToProps = (state) => ({
  loadtree: state.auth.tree
})



export default compose(withRouter, connect(mapStateToProps, { tree }))(App);
