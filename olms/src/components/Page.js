import React, { Component } from 'react';
import {BrowserRouter  as Router,Switch, Route, NavLink} from 'react-router-dom';
import '../css/Page.css'

//Components
import Cases from './Cases';
import Clients from './Clients';
import Finance from './Finance';
import Header from './Header';
import Signup from './loginSignupComponents/Signup';
import Login from './loginSignupComponents/Login';
import FlashMessages from './FlashMessages';
import Calendar from './Calendar';

class Page extends Component {
    render() {
        return(
            <div className="page-holder">
                {(this.props.location.pathname === '/signup' || this.props.location.pathname === '/login')
                ?
                    <div className="validate">
                        <section>
                            <nav>
                                <NavLink to="/login" activeClassName="on"> Login </NavLink>
                                <NavLink to="/signup" activeClassName="on"> Sign Up </NavLink>
                            </nav>
                            <Switch>                                
                                <Route path="/login" exact component={Login} />
                                <Route path="/signup" component={Signup} />
                            </Switch> 
                        </section>
                    </div>
                :
                    <div>
                        <Header/>
                        <div id="page">
                            <FlashMessages/>
                            <Switch>   
                                <Route path="/" exact component={Cases} />                             
                                <Route path="/cases" component={Cases} />
                                <Route path="/clients" component={Clients}/>
                                <Route path="/calendar" component={Calendar} />
                                <Route path="/finance" component={Finance} />
                            </Switch>  
                        </div>   
                    </div>
                }     
            </div>
        );
    }
}

export default Page;