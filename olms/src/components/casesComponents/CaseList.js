import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
//Styles in Client List

//Components
import Case from './Case';

class CaseList extends React.Component {
   constructor(props) {
      super(props);
      this.state={
         lawCases:[]
      }
   }
   componentWillReceiveProps(nextProps) {
       this.setState({lawCases: nextProps.lawCases})
   }
   
   render(){
        var lawCases = this.state.lawCases;
        lawCases = lawCases.map((item, index)=>{
         return (
            <Case 
               //Data Here will be passed back to the active case object
               id={item._id}
               title={item.title} 
               date={item.dateAdded}
               status={item.status}
               description={item.description}
               key={index}
               lawKey={item.key}
               clients={item.clients}
               activeKey={this.props.activeKey}
               selectCase={this.props.selectCase}
            />
         );
      });
      return (
         <div className="caseList">
            {lawCases}     
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      auth: state.auth,
   };
}


export default connect(mapStateToProps)(CaseList);