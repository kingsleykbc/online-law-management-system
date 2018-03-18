import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import '../../css/calendarStyles/TodoList.css';

//Components
import ToDo from './ToDo';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos:[],
            disabled:true
        }

        this.onChange = this.onChange.bind(this);
        this.addTask = this.addTask.bind(this);
        this.removeToDo = this.removeToDo.bind(this);
    }

    componentDidMount() {
        this.getTodos();
    }
    
    removeToDo(id){
        //remove a todo
        axios.delete('http://localhost:8082/todo/'+id).then(
            (data)=>{
                //Refresh the list
                this.getTodos();
            }
        )
    }
    addTask(){
        let data = {
            item: this.refs.item.value
        }
        axios.post('http://localhost:8082/todo/'+this.props.auth.user.id, data).then(
            (todo)=>{
                let todos = this.state.todos;
                todos.push(todo.data);

                //Refresh the List without making a get request
                this.setState({todos});
                this.refs.item.value = "";
            }
        );
    }
    onChange(){
        if(this.refs.item.value === ''){
            this.setState({disabled: true});
        }else{
            this.setState({disabled: false});
        }
    }
    getTodos(){
        axios.get('http://localhost:8082/todo/' + this.props.auth.user.id).then(
            (todos) => {
                this.setState({ todos: todos.data });
                this.refs.item.value = "";
            }
        )
    }
    render() {
        let todos = this.state.todos.map(function (item,index){
            return (
                <ToDo
                    key={index}
                    id={item._id}
                    item = {item.item}
                    timeAdded={item.timeAdded}
                    removeToDo={this.removeToDo}
                />
            )
        }.bind(this))
        return (
            <div id="to-do-list">
                <div className="to-do-body">
                    {todos}
                </div>
                <div className="input">
                    <input type="text" placeholder="Enter Item" ref="item" onChange={this.onChange}/>
                    <button onClick={this.addTask} disabled={this.state.disabled}>Add Task</button>
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
export default connect(mapStateToProps)(TodoList);
