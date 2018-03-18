import React, { Component } from 'react';
import '../../css/financeStyles/bill.css';
import classnames from 'classnames';

const Bill = props => (
    <div
        className={classnames('bill', 'case', { 'chosen': (props.id === props.activeID) })}
        onClick={() => { props.setActiveBill(props) }}
    >
        <div>
            <h3>{props.title}</h3>
            <p>N{props.amount}.00</p>
        </div>
        <div className="status">
            <span></span>
        </div>
    </div>
);
    

export default Bill;