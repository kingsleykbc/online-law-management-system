import React, { Component } from 'react';
import {connect} from 'react-redux';
//Components
import ClientsList from './clientsComponents/ClientsList';
import ViewClient from './clientsComponents/ViewClient';
import RequestsList from './clientsComponents/RequestsList';
import '../css/CasesClientsFinance.css'

class Clients extends Component {
    constructor(props) {
        super(props);
        this.state={
            activeClient:{}
        }
        this.setActiveClient = this.setActiveClient.bind(this);
    }
    componentWillMount (){
       if(this.props.myClients.length > 0){
           this.setDefaultActiveClient(this.props.myClients[0]);
       }
    };
    
    componentWillReceiveProps(nextProps){
        this.setDefaultActiveClient(nextProps.myClients[0]);
    }
    setDefaultActiveClient(list){
        this.setState({
            activeClient: {
                //Structure the received props to match the passed one for viewing the initial client
                name: list.firstname + " " + list.lastname + " " + list.middlename,
                phoneNumber: list.phoneNumber,
                clientID: list._id,
                email: list.email,
                occupation: list.occupation
            }
        })
    }
    setActiveClient(client){
        //Set the active client with the props of the side nav clients
        this.setState({activeClient:client},()=>{
            console.log("item is",this.state.activeClient);
        })
    }
    render() {
        return(
            <div className="cases clients">
                <div className="left">
                    <ClientsList
                        activeClientID={this.state.activeClient.clientID}
                        setActiveClient={this.setActiveClient}
                    />
                </div>
                <div className="content">
                    <ViewClient client={this.state.activeClient}/>
                </div>
                <div className="right">
                    <h3 className="section-head">
                       Client Requests
                    </h3>
                    <RequestsList />
                </div>
                
            </div>
            
        );
    }
}
function mapStateProps(state) {
    return {
        myClients: state.clientsReducer
    }
}
export default connect(mapStateProps)(Clients);