import React, { Component } from 'react';
import validateLogin from '../../actions/validateLogin';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {login} from '../../actions/login';
import classnames from 'classnames';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors:{},
            isLoading: false,
            redirect: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    isValid(){
        const {errors, isValid} = validateLogin(this.state);

        if(!isValid){
            this.setState({errors});
        }
        return isValid;
    }
    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e){
        e.preventDefault();
        if (this.isValid()){
            this.setState({errors:{}, isLoading:true});
            this.props.login(this.state).then(
                (data) =>{
                    this.setState({redirect:true});                 
                }
            ).catch(
                (error) =>{
                    this.setState({ errors: error.response.data, isLoading:false })
                }                
            );
        }
    }
    render() {
        const {errors, email, password, isLoading, redirect} = this.state;
        if (redirect === true) {
            return (
                <Redirect to="/cases" />
            )
        }
        return (
            <div className="form-box">
                <form onSubmit={this.onSubmit}>                    
                    <h4> Email </h4>
                    <input
                        className={classnames({ 'has-error': errors.email })}
                        type="text"
                        placeholder="eokafor@gmail.com"
                        value={this.state.email}
                        onChange={this.onChange}
                        name="email"
                    />
                    {errors.email && <h6 className="book">{errors.email}</h6>}
                    <h4> Password </h4>
                    <input
                        className={classnames({ 'has-error': errors.password })}
                        type="password"
                        placeholder="your password"
                        value={this.state.password}
                        onChange={this.onChange}
                        name="password"
                    />
                    {errors.password && <h6 className="book">{errors.password}</h6>}
                    {errors.form && <h6>{errors.form}</h6>}
                    <input type="submit" defaultValue="Login" disabled={isLoading} />
                </form>
            </div>
        );
    }
}

export default connect(null, {login})(LoginForm);