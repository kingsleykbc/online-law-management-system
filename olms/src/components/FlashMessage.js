import React, { Component } from 'react';
import '../css/FlashMessage.css';
import classnames from 'classnames';

//Icons
import Delete from 'react-icons/lib/md/cancel';

class FlashMessage extends Component {
    onClick(){
        this.props.deleteMessage(this.props.message.id);
    }
    render() {
        const {id,type,text} = this.props.message;
        return (
            <div className={classnames('flash-message',{
                'flash-success': type === 'success',
                'flash-fail': type === 'error'
            })}>
                {text}
                <div className="del-button">
                    <Delete onClick={this.onClick.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default FlashMessage;