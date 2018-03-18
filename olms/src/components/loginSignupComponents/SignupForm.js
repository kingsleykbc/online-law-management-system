import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import propTypes from 'prop-types';
import classnames from 'classnames';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            middlename: '',
            lastname: '',
            email: '',
            phonenumber: '',
            business: '',
            firmname: '',
            website: '',
            personalinfo: '',
            password: '',
            passwordRe: '',
            errors:{},
            isLoading: false,
            redirect: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        this.setState({
            errors: {}, 
            isLoading: true
        });        
        this.props.userSignupRequest(this.state).then(
            (data) => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'Welcome '+this.state.firstname+', you have successfully signed up for Online Law Management System !!!'
                });

                //Sign Up immediately after login
                this.props.loginOnSignUp(this.state).then(
                    (data)=>{
                        this.setState({redirect:true});
                    }
                ).catch(
                    (error)=>{
                        console.log("error proceeding")
                    }
                );
                
            }  
        ).catch(
            (error)=>{
                this.setState({
                    errors:error.response.data,
                    isLoading: false
                });
            }
        )
    }
    render() {
        const {errors, redirect} = this.state;
        if (redirect === true){
            return (
                <Redirect to="/cases"/>
            )
        }
        return (
            <div className="sign-up">
                <div className="form-box">
                    <form onSubmit={this.onSubmit}>
                        <div>
                            <span>
                                <h4> First Name </h4>
                                <input
                                    className={classnames({ 'has-error': errors.firstname})}
                                    type="text"
                                    placeholder="Emeka"
                                    value={this.state.firstname}
                                    onChange={this.onChange}
                                    name="firstname"
                                />
                                {errors.firstname && <h6 className="book">{errors.firstname}</h6>}
                            </span>
                            <span>
                                <h4> Middle Name (optional) </h4>
                                <input
                                    className={classnames({ 'has-error': errors.middlename })}
                                    type="text"
                                    placeholder="James"
                                    value={this.state.middlename}
                                    onChange={this.onChange}
                                    name="middlename"
                                />
                            </span>
                        </div>
                        <h4> Last Name </h4>
                        <input
                            className={classnames({ 'has-error': errors.lastname })}
                            type="text"
                            placeholder="Okafor"
                            value={this.state.lastname}
                            onChange={this.onChange}
                            name="lastname"
                        />
                        {errors.lastname && <h6 className="book">{errors.lastname}</h6>}
                        <div>
                            <span>
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
                            </span>
                            <span>
                                <h4> Phone number </h4>
                                <input
                                    className={classnames({ 'has-error': errors.phonenumber })}
                                    type="text"
                                    placeholder="xxxx-xxx-xxxx"
                                    maxLength={11}
                                    value={this.state.phonenumber}
                                    onChange={this.onChange}
                                    name="phonenumber"
                                />
                                {errors.phonenumber && <h6 className="book">{errors.phonenumber}</h6>}
                            </span>
                        </div>
                        <h4> Business Type </h4>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="independent"
                                    onChange={this.onChange}
                                    name="business"
                                />
                                Independent
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="firm"
                                    onChange={this.onChange}
                                    name="business"
                                />
                                Firm
                            </label>
                        </div>
                        {errors.business && <h6 className="book">{errors.business}</h6>}
                        {(this.state.business === "firm") &&
                            <article>
                                <h4> Name of Firm </h4>
                                <input
                                    className={classnames({ 'has-error': errors.firmname })}
                                    type="text"
                                    placeholder="OKA Legal Nigeria"
                                    value={this.state.firmname}
                                    onChange={this.onChange}
                                    name="firmname"
                                />
                            </article>
                        }
                        {errors.firmname && <h6 className="book">{errors.firmname}</h6>}
                        <h4> Website (optional) </h4>
                        <input
                            className={classnames({ 'has-error': errors.website })}
                            type="text"
                            placeholder="www.okafirms.com.ng"
                            value={this.state.website}
                            onChange={this.onChange}
                            name="website"
                        />
                        {errors.website && <h6 className="book">{errors.website}</h6>}
                        <h4> Personal Information </h4>
                        <textarea
                            className={classnames({ 'has-error': errors.personalinfo })}
                            placeholder="Brief Information about yourself"
                            onChange={this.onChange}
                            name="personalinfo"
                            value={this.state.personalinfo}
                        />
                        {errors.personalinfo && <h6 className="book">{errors.personalinfo}</h6>}
                        <h4> Password </h4>
                        <input
                            className={classnames({ 'has-error': errors.password })}
                            type="password"
                            placeholder="Your password should comprise of atleast an Uppercase letter, a lowercase letter and a number (0-9) "
                            value={this.state.password}
                            onChange={this.onChange}
                            name="password"
                        />
                        {errors.password && <h6 className="book">{errors.password}</h6>}
                        <h4> Re-type Password </h4>
                        <input
                            className={classnames({ 'has-error': errors.passwordRe })}
                            type="password"
                            value={this.state.passwordRe}
                            onChange={this.onChange}
                            name="passwordRe"
                        />
                        {errors.passwordRe && <h6 className="book">{errors.passwordRe}</h6>}
                        <input type="submit" defaultValue="Join" disabled={this.state.isLoading} />
                    </form>
                </div>
            </div>
        );
    }
}

export default SignupForm;