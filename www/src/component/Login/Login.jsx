import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { userLogin } from '../../Redux/authreducer'
import { withAuthRedirect } from '../HOC/withAuthRedirect'
import LoginForm from './LoginComponent'



const ReduxFormLogin = reduxForm({
    form: 'login'
})(LoginForm)


const Login = (props) => {
    const submit = (formData) =>{
        console.log(formData);
        props.userLogin(formData);

    }
    if (props.isAuth) return <Redirect to={'/profile'} /> 
    return (        
        <div>
            <h3>LOGIN</h3>
            <ReduxFormLogin captchaUrl={props.captchaUrl} onSubmit={submit}/>
        </div>
    )
}


let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl      
    }
}

export default compose(connect(mapStateToProps, {userLogin})) (Login)