import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import moment from 'moment';
import './App.css';
import {Calendar} from './calendar.js';

class App extends Component {

  constructor(props) {
    super(props);

    const currentMonth = moment().month();
    const currentYear = moment().year();

    let path = this.props.location.pathname;
    if ((path === '') || (path === '/') || (path === '/calendar_app') || (path === '/calendar_app/') ) {
        this.state = {
          month: currentMonth,
          year: currentYear
        }
        this.props.history.push("/calendar_app/" + currentMonth + "/"+ currentYear);
    } else {
      path = path.replace(/\/calendar_app\/*/g, '');
      path = path.split("/");

      this.state = {
        month: path[0],
        year: path[1],
      };
    }

    this.handleInputChangeMonth = this.handleInputChangeMonth.bind(this);
    this.handleInputChangeYear = this.handleInputChangeYear.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputChangeMonth(event) {
    const currentYear = moment().year();

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    this.props.history.push("/calendar_app/" + value + "/"+ (this.state.year || currentYear));

  }

  handleInputChangeYear(event) {
    const currentMonth = moment().month();

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    this.props.history.push("/calendar_app/" + (this.state.month || currentMonth) + "/" + value);
  }

  handleClick(event) {
    event.preventDefault();
    const target = event.target;
    let href = target.href;
    let mutatedHref = href

    mutatedHref = mutatedHref.replace(/.*\/calendar_app\/*/g, '');
    mutatedHref = mutatedHref.split("/");

    const month = mutatedHref[0];
    const year = mutatedHref[1];

    this.setState({
      month: month,
      year: year,
    });

    href = href.replace(/(.*\/calendar_app\/*)/g, '/calendar_app/')
    this.props.history.push(href);

    const monthSelect = document.getElementById('month-select');
    const yearSelect = document.getElementById('year-select');

    monthSelect.value = month;
    yearSelect.value = year;


    let opt = document.createElement('option');
    opt.value = year;
    opt.innerHTML = year;

    let yearAdded = false;
    if ((year < yearSelect.options[0].value) && (yearAdded === false)) {
      yearSelect.insertBefore(opt,yearSelect.firstChild);
      yearAdded = true;
    }
    if ((year > yearSelect.options[yearSelect.length - 1].value) && (yearAdded === false)){
      yearSelect.appendChild(opt);
      yearAdded = true;
      yearSelect.value = year;
    }

  }

  render() {

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

    for (let i = 0; i < years.length; i ++) {
      yearOptions.push(
        <option value={years[i]} key={i}>{years[i]}</option>
      );
    }


    const currentMonth = this.state.month;
    const currentYear = this.state.year;

    const previousMonth = moment().year(currentYear).month(currentMonth).subtract(1, 'months');
    const previousMonth_output = previousMonth.format('M') - 1;
    const previousMonth_outputYear = previousMonth.format('YYYY');
    const nextMonth = moment().year(currentYear).month(currentMonth).add(1, 'months');
    const nextMonth_output = nextMonth.format('M') - 1;
    const nextMonth_outputYear = nextMonth.format('YYYY');

    return (
      <Router>
        <div className="App">
          <div className="navBar">
            <a href={'/calendar_app/' + previousMonth_output +'/'+ previousMonth_outputYear} onClick={this.handleClick}>&lt; Previous Month</a>
            <form>
              <select name="month" id="month-select" defaultValue={this.state.month} onChange={this.handleInputChangeMonth}>
                {monthOptions}
              </select>
              <select name="year" id="year-select" defaultValue={this.state.year} onChange={this.handleInputChangeYear}>
                {yearOptions}
              </select>
            </form>
            <a href={'/calendar_app/' + nextMonth_output +'/'+ nextMonth_outputYear} onClick={this.handleClick}>Next Month &gt;</a>
          </div>
          <Switch>
            <Route
              exact path='/calendar_app/' render={() => (
                <Calendar/>
              )}
              />
            <Route
              exact path='/' render={() => (
                <Calendar/>
              )}
              />
            <Route
              path='/calendar_app/:month/:year'
              render={(props) => (
                <Calendar month={this.state.month} year={this.state.year} />
              )}
              />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withRouter(App);
