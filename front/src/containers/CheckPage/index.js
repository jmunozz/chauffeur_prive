import React, { Component } from 'react';

import Rider from '../../components/Rider';

import './index.css';

class CheckPage extends Component {

  state = {
    input: '',
    id: null,
  }


  handleInput = (e) => {
    e.preventDefault();
    this.setState({ input: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ id : this.state.input })
  }

  handleReset = (e) => {
    e.preventDefault();
    this.setState({ id: null, input: '' })
  }


  render() {
      return (
        <div className="page-wrapper">
          <div className="box-wrapper">
            <div className="box" style={{maxHeight:"200px"}}>
              <form id="check-form" onSubmit={this.handleSubmit}>
                <input type="text" onChange={this.handleInput} value={this.state.input}></input>
                <input className="btn color1" type="submit" value="Search"></input>
                <button className="btn color1" type="button" onClick={this.handleReset}>reset</button>
              </form>
            </div>
          </div>
          <div className="box-wrapper">
            <div className="box">
              <Rider id={this.state.id} />
            </div>
          </div>
        </div>
      );
  }
}

export default CheckPage;

