import React from 'react';
import request from 'superagent';


const REFRESH_LAPSE = 1000;
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
        clearTimeout(refresh);
        if ((this.props.options.size !== prevProps.options.size) 
            || (this.props.options.sort !== prevProps.options.sort) 
            || (this.props.options.status !== prevProps.options.status)) {
                this.fetchRiders(this.props.options);
            }
    }

    fetchRiders(options, displayLoading = true) {
        let url = `http://localhost:8000/api/rider/loyalty`;
        const qs = [];
        if (options.sort) qs.push(`sort=${options.sort}`);
        if (options.size) qs.push(`size=${options.size}`);
        if (options.status) qs.push(`status=${options.status}`);
        if (qs.length) {
            url += `?${qs.join('&')}`;
        }

        if (displayLoading) {
            this.setState({ loading: true });
        }

        request
        .get(url)
        .then(res => {
          this.setState({
            loading: false,
            riders: res.body,
            error: null,
          });
          refresh = setTimeout(() => this.fetchRiders(options, false), REFRESH_LAPSE);
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
                <tr key={r.id}>
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
