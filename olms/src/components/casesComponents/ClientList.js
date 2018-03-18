import React, { Component } from 'react';
import '../../css/casesStyles/ClientList.css';
//Components
import Client from './Client';

class ClientList extends Component {
    com
    render() {
        if(this.props.clients){
            var clients = this.props.clients.map((item, index) => {
                return(
                    <Client 
                        key={index}
                        id={item}
                    />
                );
            });
        }
        return (
            <div className="clientList">
                {clients}                
            </div>
        );
    }
}

export default ClientList;