import React from 'react';
import request from 'superagent';


const REFRESH_LAPSE = 10000;
let refresh;

class Screen extends React.Component {


    state = {
        loading: false,
        riders: null,
        error: null,
    }

    componentDidMount() {
        this.fetchRiders(this.props.options);
    }

    componentDidUpdate(prevProps) {
        console.log('props', this.props);
        console.log('prevProps', prevProps);
        const { props } = this;
        if ((props.options.size !== prevProps.options.size) 
            || (props.options.sort !== prevProps.options.sort) 
            || (props.options.status !== prevProps.options.status)) {
                console.log('on la refait!')
                this.fetchRiders(props.options);
            }
    }

    fetchRiders(options) {
        let url = `http://localhost:8000/api/rider/loyalty`;
        const qs = [];
        if (options.sort) qs.push(`sort=${options.sort}`);
        if (options.size) qs.push(`size=${options.size}`);
        if (options.status) qs.push(`status=${options.status}`);
        if (qs.length) {
            url += `?${qs.join('&')}`;
        }
        this.setState({ loading: true });
        request
        .get(url)
        .then(res => {
          this.setState({
            loading: false,
            riders: res.body,
            error: null,
          });
        //   refresh = setTimeout(() => this.fetchRiders(options), REFRESH_LAPSE);
        })
        .catch((err) => {
          this.setState({
            loading: false,
            error: err.toString(),
            rider: null,
          });
        });
    }

    render() {
        if (this.state.error) {
            return <p>{this.state.error}</p>;
        }
        if (this.state.loading || !this.state.riders) {
            return <p>Loading...</p>;
        }

        const tableData = this.state.riders.map(r => {
            return (
                <tr>
                    <th>{r.name}</th>
                    <th>{r.loyalty_points}</th>
                    <th>{r.rides_count}</th>
                    <th>{r.status}</th>
                </tr>
            );
        });

        return (
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Loyalty<br></br> Points</th>
                            <th>Rides</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData}
                    </tbody>
                </table>
            </div>
        )

    }
}

export default Screen;