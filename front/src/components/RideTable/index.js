import React, { Component } from 'react';

const RideTable = ({ rides }) => {

    const rideTable = rides.map(r => {
        return (
            <div>
                <div>
                    Id: {r.id}
                </div>
                <div>
                    Amount: {r.amount}
                </div>
                <div>
                    Status: {r.status}
                </div>
            </div>
        );
    });

    return (
        <div>
            {rideTable}
        </div>
    );
}

export default RideTable;