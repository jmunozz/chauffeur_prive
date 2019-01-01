import React from 'react';

function Filters({ setOption, unsetOption, options }) {
    return (
        <div>
            <label>Sort by:
                <select 
                    value={options.sort} 
                    onChange={(e) => setOption({ sort : e.target.value })}
                >
                    <option value="loyalty_points">Loyalty Points</option>
                    <option value="rides_count">Rides</option>
                </select>
            </label>
            <label>Filter by:
                <select 
                    value={options.status}
                    onChange={(e) => {
                        if (e.target.value === 'all')
                            unsetOption('status');
                        else {
                            setOption({ status : e.target.value });
                        }
                    }}
                >
                    <option value="all">all</option>
                    <option value="bronze">bronze</option>
                    <option value="silver">silver</option>
                    <option value="gold">gold</option>
                    <option value="platinum">platinum</option>
                </select>
            </label>
            <label>
                Size:
                <input 
                    type="number" 
                    value={options.size}
                    min="1"
                    onChange={(e) => setOption({ size : e.target.value })}
                />
            </label>
        </div>
    );
}

export default Filters;