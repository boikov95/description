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
import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import BootstrapContainer from './component/Bootstrap/BootstrapContainer';
import CommentContainer from './component/Comment/CommentContainer';
import InstructionsContainer from './component/Instructions/InstructionsContainer';
import ModalContainer from './component/Modal/ModalContainer';
//const DialogsContainer = React.lazy(()=> import ('./component/Dialogs/DialogsContainer'));
//const ProfileContainer = React.lazy(()=> import ('./component/Profile/ProfileContainer'));

class App extends React.Component {

  render() {    

    return (
      <HashRouter>
          {/* <ModalContainer /> */}
        <div className={s.wrapper}>     
          <BootstrapContainer />     
          <HeaderComponent />
          <TreeContainer />  
          <div className={s.content}>            
            <Route path='/document/:Id?' render={() => <DocumentContainer />}/>
            <Route path='/comment' render={() => <CommentContainer />}/>
            <Route path='/instructions' render={() => <InstructionsContainer />}/>             
          </div> 
        </div>
      </HashRouter>
    );
  }
}

let mapStateToProps = (state) => ({  
  loadtree: state.auth.tree
})



export default compose(withRouter, connect(mapStateToProps, {tree}))(App);
