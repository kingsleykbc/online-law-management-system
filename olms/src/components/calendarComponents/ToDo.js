import React from 'react';
//Styles in TodoList.css

//Icons
import Delete from 'react-icons/lib/ti/delete';

const ToDo = (props) => {
var dateFormatted = new Date(props.timeAdded)
dateFormatted = dateFormatted.toLocaleTimeString();

return(
    <div className="to-do">
        <span>
            <span>{props.item}</span>
        </span>
        <span>
            <Delete className="delete" onClick={()=>{props.removeToDo(props.id)}} />
        </span>
    </div>
);
}

export default ToDo;
