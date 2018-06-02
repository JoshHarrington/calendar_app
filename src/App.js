import React, { Component } from 'react';
// import Moment from 'react-moment';
import moment from 'moment';
// import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    const todayMonth = moment().month();
    const todayYear = moment().year();
    super(props);
    this.state = {
      month: todayMonth,
      year: todayYear
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const month = this.state.month;
    const year = this.state.year;
    const currentDate = moment().year(year).month(month);
    const numDaysInCurrentMonth = currentDate.daysInMonth();
    const startDayOfMonth = currentDate.date(1).day();
    const numDaysInMonthMinusFirstWeek = numDaysInCurrentMonth - (7 - startDayOfMonth);
    const numWeeksMinusFirstWeekIfNotWhole = Math.floor(numDaysInMonthMinusFirstWeek / 7);
    const numRemainderDaysEndOfMonth = (numDaysInMonthMinusFirstWeek) % (numWeeksMinusFirstWeekIfNotWhole * 7);
    let numDaysBeforeAfterMonthExtra = 0;
    if (numRemainderDaysEndOfMonth == 0) {
      numDaysBeforeAfterMonthExtra = startDayOfMonth;
    } else {
      numDaysBeforeAfterMonthExtra = startDayOfMonth + (7 - numRemainderDaysEndOfMonth);
    }
    const numDaysMonthTotalPlusBefore = numDaysInCurrentMonth + startDayOfMonth;
    const numDaysMonthTotalPlusExtra = numDaysInCurrentMonth + numDaysBeforeAfterMonthExtra;
    const lastDateOfPreviousMonth = currentDate.date(0).date();
    const firstSundayOfMonth = lastDateOfPreviousMonth - startDayOfMonth + 1;
    console.log(numRemainderDaysEndOfMonth);
    const dayOfWeekSpecial = function (d) {
      if (d === 0) {
        return "Sunday"
      } else if (d === 1) {
        return "Monday";
      } else if (d === 2) {
        return "Tuesday";
      } else if (d === 3) {
        return "Wednesday";
      } else if (d === 4) {
        return "Thursday";
      } else if (d === 5) {
        return "Friday";
      } else if (d === 6) {
        return "Saturday";
      }
    }

    console.log(this.state.month);
    console.log(this.state.year);

    let cells = [];
    let d = 0;
    let j = 1;

    for (var i = 0; i < numDaysMonthTotalPlusExtra; i++) {
      if (i < startDayOfMonth) {
        cells.push(<div data-previous-month="true" data-date={firstSundayOfMonth + i} key={i}>
          <span>{dayOfWeekSpecial(d)}</span>
          <span>{firstSundayOfMonth + i}</span>
        </div>);
      } else if (i > numDaysMonthTotalPlusBefore - 1) {
        cells.push(<div data-next-month="true" data-date={j} key={i}>
          <span>{dayOfWeekSpecial(d)}</span>
          <span>{j}</span>
        </div>);
        j++;
      } else {
        const dateInMonth = i - startDayOfMonth + 1;
        cells.push(<div data-current-month="true" data-date={dateInMonth} key={i}>
          <span>{dayOfWeekSpecial(d)}</span>
          <span>{dateInMonth}</span>
        </div>);
      }
      if (d < 6) {
        d++;
      } else {
        d = 0;
      }

    }

    return (
      <div className="App">
      <form>
        <select name="month" id="month-num" onChange={this.handleInputChange}>
          <option value="0">January</option>
          <option value="1">Feburary</option>
          <option value="2">March</option>
          <option value="3">April</option>
        </select>
        <select name="year" id="year-num" onChange={this.handleInputChange}>
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
        </select>
      </form>
        <div className="calendar-display">{cells}</div>
      </div>
    );
  }
}

export default App;
