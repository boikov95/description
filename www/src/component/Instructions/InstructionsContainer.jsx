import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import s from './Instructions.module.css';
import { setFlag } from '../../Redux/authreducer';
import { addInstructionsNew, loadInstructions, loadTeg } from '../../Redux/instructionsreducer';
import { instructionsSelector } from '../../Redux/userSelector';
import { useEffect } from 'react';

class InstructionsContainer extends React.Component {

    componentDidMount() {
        this.props.loadTeg();
        this.props.setFlag(true);
        this.props.loadInstructions("a.id like '%'");
    }
    componentWillUnmount() {
        this.props.setFlag(false);
    }
    render() {
        if (this.props.instructions.length === 0)
            return (<div className={s.instr}>Указаний по данному(данным) фильтрам не найдено</div>)
        return (
            <Instructions {...this.props} />
        )
    }
}


const Instructions = (props) => {
    const childactive = useRef();
    const [updateIns, setupdateIns] = useState(false);

    const useDidMountEffect = (func, deps) => {
        const didMount = useRef(false);
        useEffect(() => {
            if (didMount.current) func()
            else didMount.current = true;
        }, deps)
    }

    useDidMountEffect(() => {
        if (updateIns) {
            console.log("Запрос");
            props.addInstructionsNew("a.id like '%' and b.date<(select STR_TO_DATE('" + props.dateInstruction.date + "', '%d.%m.%Y %H:%i'))");
        }
    }, [updateIns])

    useEffect(() => {
        childactive.current.addEventListener('scroll', updateIn);
        //return () =>   childactive.current.removeEventListener('scroll', updateIn);        
    }, [])

    const updateIn = (e) => {
        if (childactive.current.scrollHeight - (childactive.current.scrollTop + window.innerHeight - 100) < 1) {
            setupdateIns(true);
        }
        else {
            setupdateIns(false);
        }
    }

    return (
        <div ref={childactive} className={s.blockscroll}>
            {props.instructions.map((element, index) => {
                return (
                    <div key={index} className={s.block}>
                        <div className={s.country}>
                            {element.country.toUpperCase()}
                        </div>
                        <span className={s.text}>
                            {element.text}
                        </span>
                        <div className={s.dateteg}>
                            <div className={s.date}>
                                Дата: {element.date}
                            </div>
                            <div className={s.teg}>
                                {element.teg.split(" ").map((el) => {
                                    return (
                                        <span className={s.textteg}>{el}</span>
                                    )
                                })}

                            </div>

                        </div>


                    </div>
                )
            })}
        </div>
    )


}


let mapStateToProps = (state) => {
    return {
        instructions: instructionsSelector(state),
        dateInstruction: state.instructions.instructions[state.instructions.instructions.length - 1]
    }

}

export default connect(mapStateToProps, { loadTeg, setFlag, loadInstructions, addInstructionsNew })(InstructionsContainer);