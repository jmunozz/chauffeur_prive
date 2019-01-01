import React, { Component } from 'react';
import './index.css';

import Rider from '../../containers/Rider';

class CheckPage extends Component {

  state = {
    input: '',
    id: null,
  }


  handleInput = (e) => {
    e.preventDefault();
    const newInput = e.target.value;
    this.setState({ input: newInput });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { state } = this;
    const { input } = state;
    this.setState({ id : input })
  }

  handleReset = (e) => {
    e.preventDefault();
    this.setState({ id: null, input: '' })
  }


  render() {
    const { state } = this;
    const { id, input} = state;


      return (
        <div className="page-wrapper">
          <div className="box-wrapper">
            <div className="box" style={{maxHeight:"200px"}}>
              <form id="check-form" onSubmit={this.handleSubmit}>
                <input type="text" onChange={this.handleInput} value={input}></input>
                <input className="btn color1" type="submit" value="Search"></input>
                <button className="btn color1" type="button" onClick={this.handleReset}>reset</button>
              </form>
            </div>
          </div>
          <div className="box-wrapper">
            <div className="box">
              <Rider id={id} />
            </div>
          </div>
        </div>
      );
  }
}

export default CheckPage;
