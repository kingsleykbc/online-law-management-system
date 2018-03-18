import React from 'react';
import classnames from 'classnames';
//Icons
import User from '../assets/images/icon_user.png';
import Edit from 'react-icons/lib/md/create';
import Delete from 'react-icons/lib/md/delete';
import '../css/Title.css';

const Title = (props) => {
    return (
        <div className="title">
            <div className="title-pic">
                <img className={classnames({'smaller':props.image})} src={props.image || User} alt="icon" width="60px"/>
            </div>
            <div className="title-left">
                <h3>{props.head}</h3>
                <p>{props.sub}</p>
            </div>
            <div className="title-right">
                {props.button1}
                {props.button2}
            </div>
        </div>       
    );
}
export default Title;
