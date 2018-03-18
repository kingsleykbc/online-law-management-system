import React from 'react';
import axios from 'axios';
import { NavLink, withRouter, Redirect } from 'react-router-dom'
import {connect} from 'react-redux';
import {logout} from '../actions/login';
import {getClients} from '../actions/getClients';

//Icons
import User from 'react-icons/lib/md/person';
import Settings from 'react-icons/lib/md/settings';
import Logo from 'react-icons/lib/md/account-balance';
//Style
import '../css/Header.css';

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            user:{},
            redirect:false
        }
    }
    
    componentDidMount() {
        //Get the currently logged in user
        axios.get('http://localhost:8082/lawyers/'+ this.props.auth.user.id).then(
            (data)=>{
                this.setState({user:data.data});
                //Get the user's clients
                this.props.getClients(data.data._id); 
            }
        );
    }
    handleLogout(e){
        e.preventDefault();
        this.setState({reditect:true});
        this.props.logout();
    }
    render(){
        const {isAuthenticated, user} = this.props.auth;
        const {firstname, middlename, lastname} = this.state.user;

        if (!isAuthenticated) {
            //Make Sure User is Logged In
            this.setState({ redirect: true });
        }
        if (this.state.redirect === true) {
            return (
                <Redirect to="/login" />
            );
        }

        return(
        <header className="header">
            <div>
                <Logo/>
                <span>Online Law System</span>
            </div>

            <ul>
                <li>
                    <NavLink to="/cases" activeClassName="active">
                        Cases
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/clients" activeClassName="active">
                        Clients
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/calendar" activeClassName="active">
                        Calendar
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/finance" activeClassName="active">
                        Finance
                    </NavLink>
                </li>
            </ul>
            <div>
                <input type="search" placeholder="search.."/>
            </div>
            <div>
                <User/>
                {lastname+" "+firstname}

                <div className="user-box">
                    <span>
                        <ul>
                            <li>
                                <span><User/></span>
                                <span>Profile</span>
                            </li>
                            <li>
                                    <span><Settings/></span>
                                <span>Account Settings</span>
                            </li>
                        </ul>
                    </span>
                    <a href="#" onClick={this.handleLogout.bind(this)}>Logout</a>
                </div>
            </div>
        </header>  
        );
    }
}
function mapStateToProps(state){
    return{
        auth:state.auth,
        user:state.user
    };  
}
export default withRouter(connect(mapStateToProps, {getClients,logout})(Header));