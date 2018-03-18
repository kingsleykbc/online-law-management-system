import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

//components
import CaseFilesList from './CaseFilesList';
import Title from '../Title';
import Edit from 'react-icons/lib/md/create';
import '../../css/casesStyles/ViewCase.css';


class ViewCase extends Component {
    constructor(props) {
        super(props);
        this.state={
            newDescription:'',
            update: ''
        }
        this.onChange = this.onChange.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.data){
            this.setState({newDescription:nextProps.data.description});
        }
    }
    onChange(e){
        this.setState({ [e.target.name]: e.target.value, update: 'update' });
    }
    saveChanges() {
        //Put request to Update the case description
        axios.put('http://localhost:8082/cases/' + this.props.data.id, {description: this.state.newDescription}).then(
            (data)=>{
                //Refresh Case
            }
        );
        this.setState({update:''});
    }
    render() {
        const temp = {title:'loading',lawKey:'loading'} //If No active data yet
        const { title, lawKey } = (this.props.data) ? this.props.data : temp;
        if(this.props.isNew){
            return(
                <div className="viewCase">
                    <div className="no-data">
                        No Cases. Click on the add case button to add a new case
                    </div>
                </div>
            )
        }
        return (
            <div className="viewCase">
                <Title 
                    head={title} 
                    sub={lawKey} 
                    button1={(
                        <button>
                            <span>
                               <Edit />
                            </span>
                            <span>Edit</span>
                        </button>
                    )} 
                    button2={(
                        <button onClick={this.saveChanges} className={this.state.update}> 
                            <span>
                                <Edit />
                            </span>
                            <span>Save</span>
                        </button>
                    )}
                />
                <div className="body">
                    <textarea 
                        value={this.state.newDescription} 
                        onChange={this.onChange}
                        name="newDescription"
                    >
                    </textarea>
                </div>
                <div className="included-files">
                    <CaseFilesList/>
                </div>
            </div>
        );
    }   
}
function mapStateToProps(state){
    return {
        user: state.activeCase,
        lastCase: state.lastCase
    };
}

export default connect(mapStateToProps)(ViewCase);