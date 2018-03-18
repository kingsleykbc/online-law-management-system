import React from 'react';
import '../../css/clientsStyles/Client.css';
import classnames from 'classnames';
//Icons
import UserIcon from '../../assets/images/icon_user2.png';
import Cases from 'react-icons/lib/fa/archive';
import Bill from 'react-icons/lib/fa/money';

const Client =(props)=>{
        return (
            <div 
                className={classnames('client-second', { 'chosen': (props.clientID === props.activeClientID) })}
                onClick={()=>{props.setActiveClient(props)}} 
            >
                <div className="dp">
                    <img src={UserIcon} alt="default Icon"/>
                </div>
                <div>
                    <span>{props.name}</span>
                    <span>
                        <div>
                            <Cases/>
                            00
                        </div>
                        <div>
                            <Bill/>
                            00
                        </div>
                    </span>
                </div>
            </div>
      );
}
export default Client;