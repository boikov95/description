import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { searchCountry } from '../../Redux/headerreducer';
import { setSearch, setSearchTeg } from '../../Redux/instructionsreducer';

class HeaderComponent extends React.Component {


    render() {
        return (
            <Header {...this.props} />

        )
    }
}

let mapStateToProps = (state) => {
    return {
        value: state.header.search,
        tegi: state.instructions.tegi,
        flagInstructions: state.auth.flagInstructions,
        search: state.instructions.search,
        flagDocument: state.auth.flagDocument,
        parentdocument: state.document.parentdocument
    }

}

export default connect(mapStateToProps, { searchCountry, setSearchTeg, setSearch })(HeaderComponent);