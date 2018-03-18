import React from 'react';
//Components
import Bill from './Bill';

const BillsList = (props) => {

      let bills = props.bills.map((item,index)=>{
            return(
                  <Bill 
                        id={item._id}
                        title={item.title} 
                        amount={item.amount}
                        setActiveBill={props.setActiveBill}
                        title= {item.title}
                        clientID= {item.clientID}
                        deadline= {item.deadline}
                        comment= {item.comment}
                        dateAdded= {item.dateAdded}
                        activeID={props.activeID}
                  />
            )
      })
      return (
            <div className="BillsList">
                  {bills}
            </div>
      );
}

export default BillsList;