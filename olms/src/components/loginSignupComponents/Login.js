import React, { Component } from 'react';
import '../../css/LoginSignup.css';

//Components
import LoginForm from './LoginForm';

class Login extends Component {
    render() {
        return (
            <div className="login">
                <LoginForm/>
            </div>
        );
    }
}

export default Login;