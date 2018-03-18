import React, { Component } from 'react';

//components
import Title from '../Title';

//Icons
import IconBill from '../../assets/images/icon_bill.png';
import User from 'react-icons/lib/md/person';
import Date from 'react-icons/lib/ti/calendar';
import Time from 'react-icons/lib/md/alarm';
import Comment from 'react-icons/lib/md/comment';
import Cases from 'react-icons/lib/fa/archive';
import Bill from 'react-icons/lib/fa/money';
import '../../css/financeStyles/ViewBill.css';

class ViewBill extends Component {
    render() {
        return (
            <div className="viewClient viewBill">
                <Title head={this.props.data.title} button="Edit" image={IconBill}/>
                <div className="body">
                    <ul>
                        <li>
                            <div>
                                <span><User/></span>
                                <span>Client</span>
                            </div>
                            <div>
                                {this.props.data.clientID}
                            </div>
                        </li>
                        <li>
                            <div>
                                <span><Date /></span>
                                <span>Date Added</span>
                            </div>
                            <div>
                                {this.props.data.dateAdded}
                            </div>
                        </li>
                        <li>
                            <div>
                                <span><Time /></span>
                                <span>Deadline</span>
                            </div>
                            <div>{this.props.data.deadline}</div>
                        </li>
                        <li>
                            <div>
                                <span><Comment /></span>
                                <span>Comment</span>
                            </div>
                            <div>{this.props.data.comment}</div>
                        </li>
                    </ul>
                </div>
                <div className="case-debt fin">
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

export default ViewBill;