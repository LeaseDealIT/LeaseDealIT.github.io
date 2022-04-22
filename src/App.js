import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      billing: 85,
      hours: 158,
    }
  }
  billingChange(billing) {
    this.setState({
      billing: billing
    });
  }
  hoursChange(hours) {
    this.setState({
      hours: hours
    });
  }


  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>Palkkalaskuri</h1>
        </div>
        <form>
          <div>

            <Range onChange={this.billingChange.bind(this)} value={this.state.billing} min={49} max={121} step={1} />
            <label>{this.state.billing} €/tunti</label>
          </div>
          <div>


            <Range onChange={this.hoursChange.bind(this)} value={this.state.hours} min={99} max={181} step={1} />
            <label>{this.state.hours} tuntia/kk</label>
          </div>
        </form>
        <br /><br />
        <Output data={this.state} />
      </div>
    );
  }

}


class Range extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    }
  }

  onChange(event) {

    this.props.onChange(this.state.value);
    this.setState({
      value: event.target.value
    });
  }

  render() {
    return (
      <div className="range">
        <input type="range"
          value={this.state.value}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          onChange={this.onChange.bind(this)}
        />
      </div>
    );
  }

}

class Output extends React.Component {
  render() {
    let monthlyBilling = this.props.data.billing * this.props.data.hours;
    let employerCut = monthlyBilling * 0.3;
    let employeeShare = monthlyBilling * 0.7;
    let monthlySalary = employeeShare / 1.38;
    let sideExpenses = employeeShare - monthlySalary;
    return (
      <div className="output">
        <h3>Laskutus: {monthlyBilling.toFixed(0)} €/kk</h3>
        <h3>Sinun osuus: {employeeShare.toFixed(0)} €</h3>
        <h3>LDIT osuus: {employerCut.toFixed(0)} €</h3>
        <h3>Sivukulut: {sideExpenses.toFixed(0)} €</h3>
        <h3>Kuukausipalkka: {monthlySalary.toFixed(0)} €</h3>
      </div>
    );
  }
}

export default App