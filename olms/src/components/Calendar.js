import React, { Component } from 'react';
import '../css/Calendar.css';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../css/Calendar.css';
import moment from 'moment';
import TodoList from './calendarComponents/TodoList';

BigCalendar.momentLocalizer(moment);
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class Calendar extends Component {
  render() {
    return (
      <div className="calendar">
        <div className="calendar-wrapper">
          <BigCalendar
            events={[{title:'test', start: new Date(2015,3,1), end: new Date(2015,3,1)}]}
            views = {allViews}
            startAccessor='startDate'
            endAccessor='endDate'
          />
        </div>
        <div className="todo-list">
          <h3 className="side-label">To-do List</h3>
          <TodoList/>
        </div>
      </div>
    );
  }
}

export default Calendar;
