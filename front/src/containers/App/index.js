import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import CheckPage from '../CheckPage';
import MonitorPage from '../MonitorPage';

import './index.css';

class App extends Component {


  render() {
    return (
      <Router>
        <div>
          <header>
            <div className="header">
              <div style={{borderBottom:"solid 7px #C93535"}} className="box-wrapper">
                <h1>LOYALTY PROGRAM</h1>
                </div>
              <div className="box-wrapper">
                <ul>
                  <li>
                    <Link className="pure-menu-link" to="/check">Check</Link>
                  </li>
                  <li>
                    <Link to="/monitor" className="pure-menu-link">Monitor</Link>
                  </li>
                </ul>
              </div>
          </div>
          </header>
          <div>            
            <Route exact path="/" component={CheckPage}></Route>
            <Route path="/check" component={CheckPage}></Route>
            <Route path="/monitor" component={MonitorPage}></Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
