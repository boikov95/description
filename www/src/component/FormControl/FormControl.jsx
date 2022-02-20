import React from 'react'
import s from './FormControl.module.css'

export const FormControl = ({ input, meta, ...props }) => {
    const hasError = meta.error && meta.touched;
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <div>                
                <textarea {...input} {...props} />
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}