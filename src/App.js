import React, { Component } from 'react';
// import Moment from 'react-moment';
import moment from 'moment';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const dayOfWeek = moment().day();
    const dayOfMonth = moment().date();
    const numDaysInMonth = moment().daysInMonth();
    const numDaysInOtherMonth = moment().month(0).daysInMonth();
    const numWeeksInMonth = Math.floor(numDaysInMonth / 7);
    const dayOfWeekFirstDayInMonth = moment().month(2).date(1).day();
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <Moment calendar={calendarStrings}>
            {date}
        </Moment> */}
        <p>dayOfWeek - {dayOfWeek}</p>
        <p>dayOfMonth - {dayOfMonth}</p>
        <p>numDaysInMonth - {numDaysInMonth}</p>
        <p>numDaysInOtherMonth - {numDaysInOtherMonth}</p>
        <p>numWeeksInMonth - {numWeeksInMonth}</p>
        <p>dayOfWeekFirstDayInMonth - {dayOfWeekFirstDayInMonth}</p>
      </div>
    );
  }
}

export default App;
