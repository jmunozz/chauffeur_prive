import React, { Component } from 'react';


class Menu extends React.Component {

    state = {
        selectedIndex: 0,
    }

    changeIndex = (index) => (event) => {
        event.preventDefault();
        this.setState({ selectedIndex: index })
    }

    render() {
        const children = React.Children.toArray(this.props.children);
        const tabs = children.map((c, index) => {
            return (
                <div 
                className={`menu_tab ${(index === this.state.selectedIndex ? 'selected' : '')}`}
                onClick={this.handleSelect(index)}
                >
                    {c.props.tabName}
                </div>
            );
        });
        
        return (
            <div>
                <div>{tabs}</div>
                <div>{children[this.state.selectedIndex]}</div>
            </div>
        );
    }

}

export default Menu;