import React, { Component } from 'react';
import '../../css/lightboxStyles/AddCase.css';
import {connect} from 'react-redux';
import axios from 'axios';

//Icons
import User from '../../assets/images/icon_user.png';

class AddClient extends Component { 
    //Check to see if client already exists
    checkClient(id){
        if(this.props.activeCase.clients){
            let client = this.props.activeCase.clients.filter((item, index) => {
                return id === item;
            });
            if (client.length >= 1){
                return (
                    <span className="button added">Added</span>
                );
            }else{
                return (
                    <span
                        className="button"
                        onClick={() => { this.props.addClient(id) }}>
                        Add
                    </span>
                );
            }
        }
    }
    render() {
        let clients = "apple";
        if(this.props.clients){
            clients = this.props.clients.map((item,index)=>{
                return (
                    <section key={index}> 
                        <span>
                            <img src={User} alt="client"/>
                            {item.lastname+" "+item.firstname}
                        </span>
                        {this.checkClient(item._id)}
                        
                    </section>
                )
            });
        }
        return (
            <div className="lightbox" id="add-clients">
                <div className="box">
                    <h3>Your Clients</h3>
                    <div className="all-clients">
                        {clients}
                    </div>
                </div>
                <div className="back" onClick={() => { this.props.toggleBox2('add-clients') }}>></div>
            </div>
        );
    }
}
function mapStateProps(state){
    return{
        clients: state.clientsReducer
    }
}

export default connect(mapStateProps)(AddClient);
