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
        return;
      }
      if (this.props.type == "select") {
        return (
          <div className="col-md-6 col-sm-12">
            <button className="btn-block" type="button" onClick={() => this.props.buttonHandler(name.name, name.groupid, name.heading)} key={name.name+name.groupid+name.heading}> {name.name + ": " + name.heading}</button>
            </div>
        );
      }
      else {
        return (
            <div className="col-md-6 col-sm-12" key={name.name+name.groupid+name.heading}>
            <input type="text" value={name.name} onChange = {(e) => this.handleChange(index, name.id, e.target.value, name.groupid, name.heading)}/>
            <input type="text" value={name.heading} onChange = {(e) => this.handleChange(index, name.id, name.name, name.groupid, e.target.value)}/>
            </div>
        );
      }
    }.bind(this));
    return (
        <div className="nameList">
        <div className="row">
        {nameNodes}
      </div>
      <hr/>
        <div className="row">
      {(() => {if (this.props.type == "edit") {
        return (<div className="col-xs-4"><button className="btn-block" type="button" onClick={this.addButtonHandler}>Add Drawing</button>
                <button className="btn-block" type="button" onClick={() => this.props.saveButtonHandler(this.state.drawings)}>Save Changes</button></div>)
      }
               else {
                 return(<div className="col-xs-12"><button className="btn-block" type="button" onClick={() => this.props.viewButtonHandler("north")}>Titta åt Norr</button>
                   <button className="btn-block" type="button" onClick={() => this.props.viewButtonHandler("park")}>Stå i parken</button>
                   <button className="btn-block" type="button" onClick={() => this.props.viewButtonHandler("heli")}>Flyg i helikopter</button>
                        </div>)
               }})()}
      </div></div>
    );
  }
});
