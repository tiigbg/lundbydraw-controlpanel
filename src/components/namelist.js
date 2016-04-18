import React, { Component } from 'react';

export default React.createClass({
  getInitialState: function() {
    console.log("This props " + this.props.type);
    return {drawings: this.props.data};
  },
  componentWillReceiveProps: function(newprops) {
    this.setState({drawings: newprops.data})
  },
  handleChange: function(index, id, name, groupid, heading) {
    console.log("Got " + index + " and " + name + "with id " + id);
    this.state.drawings[index] = {name:name, id:id, groupid: groupid, heading:heading};
    this.forceUpdate();
  },
  addButtonHandler: function() {
    console.log("Adding");
    this.setState({drawings: this.state.drawings.concat([{name: "", groupid: this.props.filter[0], heading:""}])});
  },
  render: function() {
    var nameNodes = this.state.drawings.map(function(name, index) {
      // console.log("My id " + name.groupid + " and filter " + this.props.filter);
      if (name.groupid != this.props.filter){
        console.log ("Dont render");
        return;
      }
      console.log ("render");
      if (this.props.type == "select") {
        return (
            <button type="button" onClick={() => this.props.buttonHandler(name.name, name.groupid, name.heading)} key={name.name+name.groupid+name.heading}> {name.heading + ": " + name.name}</button>
        );
      }
      else {
        return (
            <div key={name.name+name.groupid+name.heading}>
            <input type="text" value={name.name} onChange = {(e) => this.handleChange(index, name.id, e.target.value, name.groupid, name.heading)}/>
            <input type="text" value={name.heading} onChange = {(e) => this.handleChange(index, name.id, name.name, name.groupid, e.target.value)}/>
            </div>
        );
      }
    }.bind(this));
    return (
        <div className="nameList">
        {nameNodes}
      {(() => {if (this.props.type == "edit") {
        return (<div><button type="button" onClick={this.addButtonHandler}>Add Drawing</button>
                <button type="button" onClick={() => this.props.saveButtonHandler(this.state.drawings)}>Save Changes</button></div>)
      }})()}
      </div>
    );
  }
});
