import React, { Component } from 'react';
import moment from 'moment';
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
    if (numRemainderDaysEndOfMonth === 0) {
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

    console.log("this.state.month " + this.state.month);
    console.log("this.state.year " + this.state.year);

    console.log("current month " + moment().month());
    console.log("current year" + moment().year());

    let cells = [];
    let d = 0;
    let j = 1;
    const currentMonth = moment().year(this.state.year).month(this.state.month).format("MMMM");
    const nextMonth = moment().year(this.state.year).month(this.state.month + 1).format("MMMM");
    let nextMonthNamed = false;
    let currentMonthNamed = false;

    for (var i = 0; i < numDaysMonthTotalPlusExtra; i++) {
      if (i < startDayOfMonth) {
        cells.push(<div data-previous-month="true" data-date={firstSundayOfMonth + i} key={i}>
          <span>{dayOfWeekSpecial(d)}</span>
          <span>{firstSundayOfMonth + i}</span>
        </div>);
      } else if (i > numDaysMonthTotalPlusBefore - 1) {
        if (nextMonthNamed === false) {
          cells.push(<div data-next-month="true" data-date={j} key={i}>
            <span>{dayOfWeekSpecial(d)}</span>
            <span>{j}</span>
            <span>{nextMonth}</span>
          </div>);
        } else {
          cells.push(<div data-next-month="true" data-date={j} key={i}>
            <span>{dayOfWeekSpecial(d)}</span>
            <span>{j}</span>
          </div>);
        }
        j++;
        nextMonthNamed = true;
      } else {
        const dateInMonth = i - startDayOfMonth + 1;
        if (currentMonthNamed === false) {
          cells.push(<div data-current-month="true" data-date={dateInMonth} key={i}>
            <span>{dayOfWeekSpecial(d)}</span>
            <span>{dateInMonth}</span>
            <span>{currentMonth}</span>
          </div>);
        } else {
          cells.push(<div data-current-month="true" data-date={dateInMonth} key={i}>
            <span>{dayOfWeekSpecial(d)}</span>
            <span>{dateInMonth}</span>
          </div>);
        }
        currentMonthNamed = true;
      }
      if (d < 6) {
        d++;
      } else {
        d = 0;
      }

    }

    const monthNames = [
      "January",
      "Feburary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    let monthOptions = [];

    for (var i = 0; i < 12; i ++) {
      monthOptions.push(
        <option value={i} key={i}>{monthNames[i]}</option>
      );
    }

    const years = [
      2010,
      2011,
      2012,
      2013,
      2014,
      2015,
      2016,
      2017,
      2018,
      2019,
      2020,
      2021,
      2022,
      2023,
      2024
    ];

    let yearOptions = [];

    for (var i = 0; i < years.length; i ++) {
      yearOptions.push(
        <option value={years[i]} key={i}>{years[i]}</option>
      );
    }

    return (
      <div className="App">
      <form>
        <select name="month" id="month-num" defaultValue={this.state.month} onChange={this.handleInputChange}>
          {monthOptions}
        </select>
        <select name="year" id="year-num" defaultValue={this.state.year} onChange={this.handleInputChange}>
          {yearOptions}
        </select>
      </form>
        <div className="calendar-display">{cells}</div>
      </div>
    );
  }
}

export default App;
