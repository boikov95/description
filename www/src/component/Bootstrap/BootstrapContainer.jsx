import React from 'react';
import { connect } from 'react-redux';
import { getlastDocument } from '../../Redux/modalreducer';
import Bootstrap from './Bootstrap';
import s from './Bootstrap.module.css';

class BootstrapComponent extends React.Component {    

    render() {
        return (
            <div className={s.bootstrap}>
            <Bootstrap {...this.props} />
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        value: state.header.search,
        lastInstruction: state.modal.document
    }

}

export default connect(mapStateToProps, {getlastDocument})(BootstrapComponent);