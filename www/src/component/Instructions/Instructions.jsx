import React from 'react'
import { useEffect } from 'react';
import s from './Instructions.module.css';

const Instructions = (props) => {
    
    

    useEffect(()=>{
        document.addEventListener('scroll', props.update())
        return function(){
        document.removeEventListener('scroll', props.update())    
        }
    },[])
    //console.log(props.element.teg.split(" "))
    return (        
        <div className={s.block}>
            <div className={s.country}>
                {props.element.country.toUpperCase()}
            </div>
            <span className={s.text}>
                {props.element.text}
            </span>
            <div className={s.dateteg}>
                <div className={s.date}>
                    Дата: {props.element.date}
                </div>
                <div className={s.teg}>
                    {props.element.teg.split(" ").map((element)=>
                    {
                        return (                        
                        <span className={s.textteg}>{element}</span>
                    )})}
                    
                </div>

            </div>


        </div>
    )


}

export default Instructions