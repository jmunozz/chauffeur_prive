import React, { Component } from 'react';
import request from 'superagent';

const { loyaltyStatuses, loyaltyThreesholds, RIDE } = require('../../constants');

const REFRESH_LAPSE = 1000;
let refresh;
const urlForRider = (id) => `http://localhost:8000/api/rider/loyalty/${id}`;

class Rider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rider: null,
      loading: false,
    };
  }

  fetchRider(id) {
    this.setState({ loading: true });
    request
    .get(urlForRider(id))
    .then(res => {
      this.setState({
        loading: false,
        rider: res.body,
        error: null,
      });
      refresh = setTimeout(() => this.fetchRider(id), REFRESH_LAPSE);
    })
    .catch((err) => {
      this.setState({
        loading: false,
        error: err.toString(),
        rider: null,
      });
    });
  }

  componentDidUpdate(prevProps) {
    clearTimeout(refresh);
    if (!this.props.id && prevProps.id) {
      return this.setState({ rider: null });
    }
    if (!this.props.id) {
      return;
    }
    if (this.props.id !== prevProps.id) {
      return this.fetchRider(this.props.id);
    }
  }

  render() {
    if (this.state.error) {
      return <p>{this.state.error}</p>;
    }
    if (this.state.loading) {
      return <p>Loading...</p>;
    }
    if (!this.state.rider) {
      return <p>Enter a rider id.</p>;
    }
    return (
      <div>
        <h2>{this.state.rider.name}</h2>
        <p>{this.state.rider.status}</p>
        <p>
          <i class="fas fa-medal"></i>
          <span style={{marginLeft:"15px"}}>{this.state.rider.loyalty_points}</span>
        </p>
        <p>
          <i class="fas fa-car"></i>
          <span style={{marginLeft:"15px"}}>{getCompletedRides(this.state.rider.rides).length}</span>
        </p>
        <p>{calculateRidesBeforeNextStatus(getCompletedRides(this.state.rider.rides).length)}</p>
      </div>
    );
  }
}

function getCompletedRides(rides) {
  return rides.filter(r => r.status === RIDE.STATUS.COMPLETED);
}


function calculateRidesBeforeNextStatus(rides) {
  if (rides < loyaltyThreesholds[0]) return `${loyaltyThreesholds[0] - rides} rides to ${loyaltyStatuses[1]}`;
  if (rides < loyaltyThreesholds[1]) return `${loyaltyThreesholds[1] - rides} rides to ${loyaltyStatuses[2]}`;
  if (rides < loyaltyThreesholds[2]) return `${loyaltyThreesholds[2] - rides} rides to ${loyaltyStatuses[3]}`;
  return '';
}

export default Rider;
