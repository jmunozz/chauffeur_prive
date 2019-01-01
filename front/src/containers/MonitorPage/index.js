import React from 'react';

import Screen from './Screen';
import Filters from './Filters';
import './index.css';

class MonitorPage extends React.Component {

    state = {
        options: {
            size: 5,
            sort: 'rides_count',
        }
    }

    unsetOption = (option) => {
        const newOptions = { ...this.state.options };
        delete newOptions[option];
        return this.setState({ options: newOptions});
    }

    setOption = (option) => {
        return this.setState({ options: { ...this.state.options, ...option }});
    }

    render() {


        return (
            <div className="page-wrapper">
            <div style={{flex:"1"}}className="box-wrapper">
              <div className="box" style={{maxHeight:"200px"}}>
                <Filters unsetOption={this.unsetOption} setOption={this.setOption} options={this.state.options} />
              </div>
            </div>
            <div style={{flex:"2"}}className="box-wrapper">
              <div className="box">
                <Screen options={this.state.options}/>
              </div>
            </div>
          </div>
        );
    }
}

export default MonitorPage;