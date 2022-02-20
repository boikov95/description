import React from 'react'
import { Field} from 'redux-form'
import { FormControlInput } from '../Common/FormControl/FormControl'
import { required } from '../Utils/required'
import s from '../Common/FormControl/FormControl.module.css'


const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={FormControlInput} validate={required} name={'login'} placeholder={'login'} />
            </div>
            <div>
                <Field component={FormControlInput} validate={required} name={'password'} placeholder={'password'} type={'password'}/>
            </div>
            <div>
                <Field component={FormControlInput} name={'rememberMe'} type={'checkbox'} /> Remember Me
            </div>
            {props.error && <div className={s.errorLogin}>{props.error}</div>}
            {props.captchaUrl && <img src={props.captchaUrl} />}
            {props.captchaUrl && <Field component={FormControlInput} validate={required} name={'captcha'} placeholder={'Введите символы с картинки'} />}
            <div>
                <button>Log IN</button>
            </div>
        </form>
    )

}

export default LoginForm