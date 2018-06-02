import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import moment from 'moment';
import './App.css';
import {Calendar} from './calendar.js';

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

    this.triggerHistoryUpdate();
  }

  triggerHistoryUpdate() {
    this.props.history.push("/calendar_app/"+this.state.month+ "/"+this.state.year);
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
        <Switch>
          <Route
            exact path='/calendar_app/' render={() => (
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
    );
  }
}

export default withRouter(App);
