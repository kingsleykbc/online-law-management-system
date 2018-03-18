import React, { Component } from 'react';
import { toggleLightBox } from '../utils/functions';
import {connect} from 'react-redux';
import axios from 'axios';
 
//Components
import BillsList from './financeComponents/BillsList';
import ViewBill from './financeComponents/ViewBill';
import AddBill from './lightboxes/AddBill';

//Icons
import User from 'react-icons/lib/md/person';
import Email from 'react-icons/lib/md/markunread';
import Phone from 'react-icons/lib/fa/phone';
import '../css/CasesClientsFinance.css'

class Clients extends Component {
    constructor(props) {
        super(props);
        this.state={
            bills:[],
            activeBill:{}
        }
        this.getBills = this.getBills.bind(this);
        this.setActiveBill = this.setActiveBill.bind(this);
    }
    componentDidMount() {
        this.getBills();
    }
    getBills(){
        axios.get('http://localhost:8082/bills/'+this.props.auth.user.id).then(
            bills =>{
                this.setState({bills: bills.data});
                this.setDefaultActiveBill(bills.data[0]);
            }
        )
    }
    setDefaultActiveBill(list) {
        this.setState({
            activeBill: {
                //Structure the received props to match the passed one for viewing the initial client
                id: list._id,
                title: list.title,
                clientID: list.clientID,
                deadline: list.deadline,
                comment: list.comment,
                dateAdded: list.dateAdded
            }
        })
    }
    setActiveBill(bill) {
        //Set the active bill with the props of the side nav clients
        this.setState({ activeBill: bill });
    }
    render() {
        return (
            <div className="cases finance">
                <div className="left">
                    <BillsList bills={this.state.bills} setActiveBill={this.setActiveBill} activeID={this.state.activeBill.id}/>
                </div>
                <div className="content">
                    <ViewBill data={this.state.activeBill}/>
                </div>
                <div className="right">
                    <nav className="grow">
                    <div className="client-info">
                        <h3>Client's Contact</h3>
                        <ul>
                            <li>
                                <span><User/></span>
                                <span>User's full Name</span>
                            </li>
                            <li>
                                <span><Email/></span>
                                <span>useremail@example.com</span>
                            </li>
                            <li>
                                <span><Phone/></span>
                                <span>0000-000-0000</span>
                            </li>
                        </ul>
                    </div>
                    <div className="client-status">
                        <h3>Client's Financial Status</h3>
                        <textarea>
                            this is a message coming directly from the client
                        </textarea>
                    </div>
                    </nav>
                    <span className="caseControls">
                        <div onClick={() => { toggleLightBox('add-bill')}} >Add Bill</div>
                    </span>
                </div>
                {/*LIGHTBOXES*/}
                <AddBill toggleBox={toggleLightBox} getBills={this.getBills} lawyerID={this.props.auth.user.id}/>
            </div>

        );
    }
}
function mapStateProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateProps)(Clients);