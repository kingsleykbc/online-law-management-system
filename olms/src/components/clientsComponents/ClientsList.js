import React,{Component} from 'react';
import {connect} from 'react-redux';
//Components
import Client from './Client';

class ClientsList extends Component {
    render(){
        let myClients = this.props.myClients.map((item,index)=>{
           return(
              <Client
                  //Data here will be used in the view client page as well
                  key={index}
                  name={item.firstname+" "+item.lastname+" "+item.middlename}
                  clientID={item._id}
                  activeClientID={this.props.activeClientID}
                  setActiveClient={this.props.setActiveClient}
                  email={item.email}
                  occupation={item.occupation}
                  phoneNumber={item.phoneNumber}
              />
           )   
        })
        return (
           <div className="caseList">
              {myClients}
           </div>
        );
    }
}

function mapStateProps(state) {
    return {
        myClients: state.clientsReducer
    }
}
export default connect(mapStateProps)(ClientsList);