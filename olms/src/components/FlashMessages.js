import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {deleteMessage} from '../actions/flashMessages';

//Components
import FlashMessage from './FlashMessage';

class FlashMessages extends Component {
    static propTypes = {
        messages: PropTypes.array.isRequired
    };
    render() {
        const messages = this.props.messages.map(item =>
            <FlashMessage key={item.id} message={item} deleteMessage={this.props.deleteMessage}/>
        )
        return (
            <div>
                {messages}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        messages: state.flashMessages
    }
}

export default connect(mapStateToProps, {deleteMessage})(FlashMessages);