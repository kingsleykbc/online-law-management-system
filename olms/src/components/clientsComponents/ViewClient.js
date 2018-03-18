import React, { Component } from 'react';
//components
import Title from '../Title';
//Icons
import User from 'react-icons/lib/md/person';
import Email from 'react-icons/lib/md/markunread';
import Phone from 'react-icons/lib/fa/phone';
import Office from 'react-icons/lib/md/business';
import Cases from 'react-icons/lib/fa/archive';
import Bill from 'react-icons/lib/fa/money';
import '../../css/clientsStyles/ViewClient.css';

class ViewClient extends Component {
    render() {
        const {name,otherName,email,phoneNumber,occupation} = this.props.client;
        return (
            <div className="viewClient">
                <Title 
                   head={name} 
                   sub={phoneNumber} 
                />
                <div className="body">
                    <ul>
                        <li>
                            <div>
                                <span><User/></span>
                                <span>Name</span>
                            </div>
                            <div>
                               {name}
                            </div>
                        </li>
                        <li>
                            <div>
                                <span><Email /></span>
                                <span>Email</span>
                            </div>
                            <div>
                                {email}
                            </div>
                        </li>
                        <li>
                            <div>
                                <span><Phone /></span>
                                <span>Phone Number</span>
                            </div>
                            <div>{phoneNumber}</div>
                        </li>
                        <li>
                            <div>
                                <span><Office /></span>
                                <span>Occupation</span>
                            </div>
                            <div>{occupation}</div>
                        </li>
                    </ul>
                </div>
                <div className="case-debt">
                    <div>
                        <h4>
                            <Cases/>
                            Cases
                        </h4>
                        <span>Title of the case surrently being taken</span>
                    </div>
                    <div>
                        <h4>
                            <Bill/>
                            Dept
                        </h4>
                        <span>N00:00</span>
                    </div>
                </div>
            </div>
      );
    }
}

export default ViewClient;