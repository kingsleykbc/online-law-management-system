import React, { Component } from 'react';
import classnames from 'classnames';
import '../../css/casesStyles/Case.css';

class Case extends Component {
    render() {
        var {status, date} = this.props;
        var dateFormatted = new Date(date)
        var getday = dateFormatted.toLocaleDateString()+" - "+dateFormatted.toLocaleTimeString();
        return (
            <div 
                className={classnames('case',{'chosen':(this.props.lawKey === this.props.activeKey)})} 
                onClick={()=>{this.props.selectCase(this.props)}} 
            >
                <div>
                    <h3>{this.props.title}</h3>
                    <p>{getday}</p>
                </div>
                <div className="status">
                    <span
                    className={classnames({ 
                        'very-urgent': status == 'Very Urgent',
                        'urgent': status == 'Urgent',
                        'minor': status == 'Minor',
                        'very-minor': status == 'Very Minor',
                     })}
                    >
                    </span>
                </div>
            </div>
      );
    }
}
export default Case;