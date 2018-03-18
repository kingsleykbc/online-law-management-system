import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import classnames from 'classnames';
import validateCases from '../actions/validateCases';
import {addCase} from '../actions/addCase';
import ScrollArea from 'react-scrollbar';
import {toggleLightBox} from '../utils/functions';

//Components
import CasesBody from './CasesBody';
import CaseControls from './casesComponents/CaseControls';
import '../css/CasesClientsFinance.css'

class Cases extends Component { 
    constructor(props) {
        super(props);
        this.state={
            lawyerId: this.props.auth.user.id,
            status:'Very Urgent',
            title:'',
            key:'',
            description:'',
            lightbox:'none',
            opacity:0,
            errors:{},
            isLoading:false,
            lawCases:[]
        }
        this.toggleBox = this.toggleBox.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getCases = this.getCases.bind(this);
    }
    componentDidMount() {
        //Get all the cases when the page is loaded
        this.getCases();
    }

    //get all cases
    getCases(){
        axios.get('http://localhost:8082/cases/' + this.props.auth.user.id).then(
            (data) => { this.setState({ lawCases: data.data }) }
        ).catch(
            (error) => { console.log(error) }
        );
    }

    //Validate Case submission
    isValid() {
        const { errors, isValid } = validateCases(this.state);

        if (!isValid) {
            this.setState({ errors });
        }
        return isValid;
    }
    
    //Handle Submission
    onSubmit(e){
        e.preventDefault();
        
        if(this.isValid()){
            this.setState({errors:{}, isLoading:true});
            this.props.addCase(this.state).then(
                (data) =>{
                    this.toggleBox();  
                    //Refresh the cases 
                    this.getCases();
                }
            ).catch(
                (error) =>{
                    this.setState({ errors: error.response.data, isLoading:false })
                }                
            );
        }
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    
    toggleBox(){
        var op = this.state.opacity;

        //LightBox Animation
        if (this.state.lightbox === 'none'){ 
            var it = setInterval(() => {
                op += 0.1;
                this.setState({lightbox:'block', opacity: op });

                if (op >= 1) {
                    clearInterval(it);
                };
            }, 20);
        }else{
            it = setInterval(() => {
                op -= 0.1;
                this.setState({opacity: op });

                if (op <= 0) {
                    this.setState({ lightbox: 'none', })
                    clearInterval(it);       
                };
            }, 20);  
        }
    }
    toggleBox2(id){
        toggleLightBox(id);
    }
    render() {
        if (!this.props.isAuthenticated){<Redirect to="/login"/>}

        const {errors} = this.state;
        return(
            <div className="cases">
                <CasesBody lawCases={this.state.lawCases} toggleBox2={this.toggleBox2}/>
                <CaseControls toggleBox={this.toggleBox} toggleBox2={this.toggleBox2} />

                {/*LIGHTBOX*/}
                <div className="lightbox" style={{display: this.state.lightbox, opacity: this.state.opacity}}>
                    <div className="box">
                        <form onSubmit={this.onSubmit}>
                            <section>
                                <h4>Case Title</h4>
                                <input 
                                    className={classnames({ 'has-error': errors.title })}
                                    type="text"
                                    value={this.state.title} 
                                    name="title" 
                                    placeholder="Title of the Case" 
                                    onChange={this.onChange}
                                />
                                {errors.title && <h6 className="book">{errors.title}</h6>}

                                <div>
                                    <span>
                                        <h4>Case ID</h4>
                                        <input 
                                            className={classnames({ 'has-error': errors.key })}
                                            type="text"
                                            value={this.state.key} 
                                            name="key" 
                                            placeholder="Title of the Case" 
                                            onChange={this.onChange} 
                                        />
                                        {errors.key && <h6 className="book">{errors.key}</h6>}
                                    </span>
                                    <span>
                                        <h4>Priority</h4>
                                        <select
                                            className={classnames({ 'has-error': errors.priority })}
                                            value={this.state.priority}
                                            name="status"
                                            placeholder="Case Priority"
                                            onChange={this.onChange}
                                        >
                                            <option>Very Urgent</option>
                                            <option>Urgent</option>
                                            <option>Minor</option>
                                            <option>Very Minor</option>
                                        </select>
                                        {errors.status && <h6 className="book">{errors.status}</h6>}
                                    </span>
                                </div>

                                <h4>Case Description</h4>
                                <textarea 
                                    className={classnames({ 'has-error': errors.description })}
                                    name="description"
                                    value={this.state.description} 
                                    placeholder="Detailed Description about the case being handled"
                                    onChange={this.onChange}
                                >
                                </textarea>
                                {errors.description && <h6 className="book">{errors.description}</h6>}
                            </section>
                            <div className="buttons">
                                <button className="button">Add</button>
                                <div className="button" onClick={this.toggleBox}>Cancel</div>
                            </div>
                        </form>
                    </div>
                    <div className="back" onClick={this.toggleBox}></div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}
export default connect(mapStateToProps,{addCase})(Cases);