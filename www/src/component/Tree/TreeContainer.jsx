import React from 'react';
import { connect } from 'react-redux';
import TreeCategory from './TreeCategory';
import tooglephoto from '../../photo/loading.gif'
import { tree } from '../../Redux/authreducer';
import s from './Tree.module.css';
import { loadTree } from '../../Redux/userSelector';


class TreeComponent extends React.Component {        

    componentDidMount() {
        this.props.tree();
    }


    render() {        
        if (this.props.loadtree.length == 0)
            return (<div>
                <img className={s.photoload} src={tooglephoto} />
            </div>)

        return (            
            <nav className={s.nav}> 
                <TreeCategory loadtree={this.props.loadtree.filter(u=>u.text.toLowerCase().indexOf(this.props.search.toLowerCase())!=-1)} />
            </nav>
        )
    }
}

let mapStateToProps = (state) => {
    return {        
        loadtree: loadTree(state),
        search: state.header.search
    }

}

export default connect(mapStateToProps, { tree })(TreeComponent);