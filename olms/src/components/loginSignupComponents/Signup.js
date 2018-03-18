import React, { Component } from 'react';
import '../../css/LoginSignup.css';
import {connect} from 'react-redux';
import {userSignupRequest} from '../../actions/signupActions';
import {addFlashMessage} from '../../actions/flashMessages';
import {login} from '../../actions/login';

//Components
import SignupForm from './SignupForm';

class Signup extends Component {
    render() {
        const { userSignupRequest, addFlashMessage, login } = this.props;
        return (
            <div className="sign-up">
                <SignupForm 
                  addFlashMessage={addFlashMessage}
                  userSignupRequest={userSignupRequest}
                  loginOnSignUp={login}
                />    
            </div>
        );
    }
}

// Signup.propTypes = {
//     userSignupRequest: React.PropTypes.func.isRequired
// }

export default connect((state) => { return {} }, { userSignupRequest, addFlashMessage, login})(Signup);