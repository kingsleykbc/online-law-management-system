import React, { Component } from 'react';
import axios from 'axios';

//Components
import CaseList from './casesComponents/CaseList';
import ClientList from './casesComponents/ClientList';
import ViewCase from './casesComponents/ViewCase';
import AddClient from './lightboxes/AddClient';
import {connect} from 'react-redux';

class CasesBody extends Component {
    constructor(props) {
        super(props);
        this.state ={
            activeCase:{},
            isNew:false
        }
        this.selectCase = this.selectCase.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.lawCases){
            this.setState({ activeCase: nextProps.lawCases[0]});
        }else{
            this.setState({ isNew: true })
        }
        //if no cases
        if (nextProps.lawCases.length <= 0){
            this.setState({ isNew: true })
        }else{
            this.setState({isNew: false});
        }
        
    }
    
    //Get the active Case from the Clicked Option
    selectCase(ind){
        this.setState({activeCase:ind});
    }
    //Add a client to a case
    addClient(clientID){
        //Close Box
        this.props.toggleBox2('add-clients');
        //Push new Client
        var clientList = this.state.activeCase.clients;
        clientList.push(clientID);
        //Update the state
        var newActiveCase = {
            id: this.state.activeCase.id,
            title: this.state.activeCase.title, 
            date: this.state.activeCase.dateAdded,
            status: this.state.activeCase.status,
            description: this.state.activeCase.description,
            lawKey: this.state.activeCase.key,
            clients:clientList
        }
        this.setState({ activeCase: newActiveCase},()=>{
            //PPut Client in Case DB
            axios.put('http://localhost:8082/cases/'+this.state.activeCase.id,this.state.activeCase);
        });
        
    }
    render() {
        return (
            <div className="casesBody">
                <div className="left">
                    <CaseList 
                        lawCases={this.props.lawCases} 
                        selectCase={this.selectCase} 
                        activeKey={(this.state.activeCase)?this.state.activeCase.lawKey:''}
                    />
                </div>
                <div className="content">
                    <ViewCase data={this.state.activeCase} isNew={this.state.isNew}/>
                </div>
                <div className="right">
                    <h3 className="section-head">
                        Client's Involved
                    </h3>
                    <ClientList
                        clients={(this.state.activeCase) ? this.state.activeCase.clients : '' } 
                    />
                </div>
                {/*The Add CLient Dashboard*/}
                <AddClient 
                    toggleBox2={this.props.toggleBox2}
                    activeCase={(this.state.activeCase) ? this.state.activeCase : ''}
                    addClient={this.addClient.bind(this)}
                />
            </div>
        );
    }
}

function mapStateProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateProps)(CasesBody);