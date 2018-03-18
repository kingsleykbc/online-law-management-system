import React, { Component } from 'react';
import '../../css/lightboxStyles/AddBill.css';
import {connect} from 'react-redux';
import classnames from 'classnames';
import validateBills from '../../actions/validateBills';
import axios from 'axios';

class AddBill extends Component {

constructor(props) {
    super(props);
    this.state={
        title:'',
        clientID:'',
        comment:'',
        amount:'',
        deadline:new Date(),
        errors:{},
        isLoading:false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
}
onChange(e){
    this.setState({[e.target.name]:e.target.value});
}

onSubmit(e){
    e.preventDefault();
    const { errors, isValid } = validateBills(this.state); 

    if (this.isValid()) {
        this.setState({ errors: {}, isLoading: true });

        //Add a bill
        axios.post('http://localhost:8082/bills/'+this.props.lawyerID, this.state).then(
            (data) => {
                this.props.toggleBox('add-bill');
                //bills
                this.props.getBills();
            }
        ).catch(
            (error) => {
                //Server errors
                this.setState({ errors: error.response.data, isLoading: false })
            }
        );
    }
} 

//Validate Bill submission
isValid() {
    const { errors, isValid } = validateBills(this.state);

    if (!isValid) {
        this.setState({ errors });
    }
    return isValid;
}

render() {
    const {errors} = this.state;
    let clients = this.props.clients.map((item,index)=>{
        return(
            <option value={item._id} key={index}>{item.lastname+" "+item.firstname}</option>
        );
    });
    return (
      <div className="lightbox" id="add-bill">
        <div className="box">
            <form onSubmit={this.onSubmit}>
                    <section>
                        <div>
                            <span>
                                <h4>Bill Title</h4>
                                <input
                                    className={classnames({ 'has-error': errors.title })}
                                    type="text"
                                    value={this.state.title}
                                    name="title"
                                    placeholder="Title of the Bill"
                                    onChange={this.onChange}
                                />
                                {errors.title && <h6 className="book">{errors.title}</h6>}
                            </span>
                            <span>
                                <h4>Deadline</h4>
                                <input
                                    className={classnames({ 'has-error': errors.title })}
                                    type="date"
                                    value={this.state.deadline}
                                    name="deadline"
                                    onChange={this.onChange}
                                />
                                {errors.title && <h6 className="book">{errors.deadline}</h6>}
                            </span>
                        </div>
                        <div>
                            <span>
                                <h4>Client</h4>
                                <select
                                    className={classnames({ 'has-error': errors.key, 'default-select':this.state.clientID === "" })}
                                    name="clientID"
                                    ref="clientID"
                                    onChange={this.onChange}
                                    value={this.state.clientID}
                                >   
                                    <option value="" disabled={true}> -- Select a client -- </option>
                                    {clients}
                                </select>
                                {errors.clientID && <h6 className="book">{errors.clientID}</h6>}
                            </span>
                            <span>
                                <h4>Amount (NGN)</h4>
                                <input
                                    className={classnames({ 'has-error': errors.priority })}
                                    value={this.state.amount}
                                    type="number"
                                    name="amount"
                                    placeholder="00.00"
                                    onChange={this.onChange}
                                />
                                {errors.amount && <h6 className="book">{errors.amount}</h6>}
                            </span>
                        </div>
                        <h4>Comment</h4>
                        <textarea
                            className={classnames({ 'has-error': errors.description })}
                            name="comment"
                            value={this.state.comment}
                            placeholder="Detailed Description about the case being handled"
                            onChange={this.onChange}
                        >
                        </textarea>
                        
                    </section>

                    <div className="buttons">
                        <button className="button">Add</button>
                        <div className="button" onClick={this.toggleBox}>Cancel</div>
                    </div>
            </form>
        </div>
        <div className="back"  onClick={() => { this.props.toggleBox('add-bill') }}></div>
      </div>
    )
  }

};

function mapStateProps(state) {
    return {
        clients: state.clientsReducer,
        auth: state.auth
    }
}

export default connect(mapStateProps)(AddBill);