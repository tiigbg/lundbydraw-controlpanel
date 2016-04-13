import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NameList from './namelist';

export default React.createClass({
  getInitialState: function() {
    return {filter: -1};
  },
  handleChange: function(e) {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    console.log("Filter " + value);
    this.setState({filter: value});
  },
  render: function() {
    console.log(this.props.data);
    var groupNodes = [1, 2, 3, 4, 5].map(function(group) {
      return (
          <option value={group} key={group}>{group}</option>
      )
    });
    return (
        <div className="filterableNameList">
        <select onChange={this.handleChange}>
        {groupNodes}
      </select>
        {React.cloneElement(this.props.children, { filter: this.state.filter })}
        </div>
    );
  }
});
