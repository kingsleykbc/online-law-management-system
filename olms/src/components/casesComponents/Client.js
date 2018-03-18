import React,{Component} from 'react';
import {connect} from 'react-redux';
import '../../css/casesStyles/Client.css';
//Icons
import UserIcon from '../../assets/images/icon_user.png';
import Delete from 'react-icons/lib/ti/delete';

//Take the ID, filter the store and get the Object
class Client extends Component {
    turnIDtoObject(id){
        let clientData = this.props.client.filter((item, index) => {
            return id === item._id;
        });
        return clientData;
    }
    render(){
        let client = this.turnIDtoObject(this.props.id);
        client = client[0]//Because the filter method returns an array, we have to add [0] to the variable name
        return (
            <div className="client">
                <img alt="user Icon" src={UserIcon} width="40px"/>
                {client !== undefined ? <div>{client.firstname + " " + client.lastname}</div> : <div>loading</div> }
                
                <Delete/>
            </div>
        );
    }
}
function mapStateProps(state){
    return {
        client:state.clientsReducer
    }
}
export default connect(mapStateProps)(Client);