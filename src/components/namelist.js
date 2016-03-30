import React, { Component } from 'react';

export default React.createClass({
  render: function() {
    var nameNodes = this.props.data.map(function(name) {
      console.log("My id " + name.groupid + " and filter " + this.props.filter);
      if (name.groupid != this.props.filter){
        console.log ("Dont render");
        return;
      }
      console.log ("render");
      return (
        <div>
          <button type="button" onClick={() => this.props.buttonHandler(name.name, name.groupid, name.heading)}> {name.heading + ": " + name.name}</button>
        </div>
      );
    }.bind(this));
    return (
        <div className="nameList">
        {nameNodes}
      </div>
    );
  }
});
