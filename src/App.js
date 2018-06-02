import React, { Component } from 'react';
// import Moment from 'react-moment';
import moment from 'moment';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const month = "Dec";
    const year = 2018;
    const currentDate = moment().year(year).month(month);
    const numDaysInCurrentMonth = currentDate.daysInMonth();
    const startDayOfMonth = currentDate.date(1).day();
    const numDaysInMonthMinusFirstWeek = numDaysInCurrentMonth - (7 - startDayOfMonth);
    const numWeeksMinusFirstWeekIfNotWhole = Math.floor(numDaysInMonthMinusFirstWeek / 7);
    const numRemainderDaysEndOfMonth = (numDaysInMonthMinusFirstWeek) % (numWeeksMinusFirstWeekIfNotWhole * 7);
    const numDaysBeforeAfterMonthExtra = startDayOfMonth + (7 - numRemainderDaysEndOfMonth);
    const numDaysMonthTotalPlusBefore = numDaysInCurrentMonth + startDayOfMonth;
    const numDaysMonthTotalPlusExtra = numDaysInCurrentMonth + numDaysBeforeAfterMonthExtra;
    const lastDateOfPreviousMonth = currentDate.date(0).date();
    const firstSundayOfMonth = lastDateOfPreviousMonth - startDayOfMonth + 1;

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
        <div className="calendar-display">{cells}</div>
      </div>
    );
  }
}

export default App;
