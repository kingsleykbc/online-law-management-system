import React,{Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { getClients } from '../../actions/getClients';
import {dismissDOM} from '../../utils/functions';
//Components
import Request from './Request';
import '../../css/casesStyles/ClientList.css';

class ClientList extends Component {
      constructor(props) {
          super(props);
          this.state={
              requests:[],
              modal:""
          }
          this.requestResponse = this.requestResponse.bind(this);
      }      
      componentDidMount (){
         this.getRequests();
      };
      getRequests(){
         axios.get('http://localhost:8082/getClientRequests/'+this.props.auth.user.id).then(
            (requests)=>{
               console.log("request is", requests);
               this.setState({requests:requests.data});
            }
         )
      }
      deleteRequest(reqID){
         axios.delete('http://localhost:8082/lawyerRequests/'+reqID).then(
            (responseMessage)=>{
                this.getRequests();
            }
         );   
      }
      requestResponse(isAccept, reqID, clientID){
         if(isAccept){
            //Lawyer clicked on accept request   
            axios.put('http://localhost:8082/clients/' + clientID, {lawyerID: this.props.auth.user.id}).then(
               (data)=>{
                  this.showModal(data.data+" successfully added to clients");  
                  //Delete the Request
                  this.deleteRequest(reqID);
                  //Refresh Client List
                  this.props.getClients(this.props.auth.user.id); 
               }
            )
         }else{
            //Lawyer clicked on Reject
            this.deleteRequest(reqID);
         }
      }
      showModal(message){
         this.setState({modal:(
            <div id="modal" className="modal">
              {message}
            </div>
         )});
         dismissDOM("modal");
      }
      render(){
         let requests = this.state.requests.map((item,index)=>{
            return(
                  <Request
                      key={index}
                      reqID={item.request._id}
                      clientID={item.request.clientID}
                    name={item.client.firstname + " "+item.client.middlename+" "+item.client.lastname}
                      requestResponse={this.requestResponse}
                  />
            )
         });
         return (
            <div className="clientList">
               {(requests.length <= 0) && <p className="empty-message">No Requests</p>}
               {requests}
               {this.state.modal}
            </div>
         );
      }
}
function mapStateProps(state){
    return{
        auth:state.auth
    }
}
export default connect(mapStateProps,{getClients})(ClientList);