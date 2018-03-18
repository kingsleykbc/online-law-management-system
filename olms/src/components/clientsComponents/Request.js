import React from 'react';
import '../../css/clientsStyles/Request.css';
//Icons
import UserIcon from '../../assets/images/icon_user.png';
import Accept from 'react-icons/lib/fa/check';
import Reject from 'react-icons/lib/fa/close';

const Request = (props)=>{
    return (
        <div className="request">
            <div className="client">
                <img alt="user Icon" src={UserIcon} width="40px" className="req-dp"/>
                <div>{props.name}</div>
            </div>
            <div className="request-options">
                <div className="accept" onClick={()=>{props.requestResponse(true, props.reqID, props.clientID)}}>
                    <span><Accept/></span>
                    Accept
                </div>
                <div className="decline" onClick={()=>{props.requestResponse(false, props.reqID, props.clientID)}}>
                    <span><Reject/></span>
                    Decline
                </div>
            </div>
        </div>
    );
}
export default Request;