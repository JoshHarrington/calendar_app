import React, { Component } from 'react';
import moment from 'moment';
import './App.css';

class Calendar extends Component {


  render() {
		let month = '';
		let year = '';
		if (this.props.month && this.props.year) {
			month = this.props.month;
			year = this.props.year;
		} else {
			month = moment().month();
			year = moment().year();
		}

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

		let currentMonth = '';
		let nextMonth = '';
		if (this.props.month && this.props.year) {
			currentMonth = moment().year(this.props.year).month(this.props.month).format("MMMM");
			nextMonth = moment().year(this.props.year).month(this.props.month).add(1, 'months').format("MMMM");
		} else {
			currentMonth = moment().format("MMMM");
			nextMonth = moment().add(1, 'months').format("MMMM");
		}

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

    for (let i = 0; i < 12; i ++) {
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

    for (let i = 0; i < years.length; i ++) {
      yearOptions.push(
        <option value={years[i]} key={i}>{years[i]}</option>
      );
    }

    return (
			<div className="calendar-display">
				{cells}
			</div>
    );
  }
}

export {Calendar};
