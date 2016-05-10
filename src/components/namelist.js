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
    console.log("Got " + index + " and " + name + " with id " + id + " and heading " + heading);
    this.state.drawings[index] = {name:name, id:id, groupid: groupid, heading:heading};
    this.forceUpdate();
  },
  addButtonHandler: function() {
    console.log("Adding");
    this.setState({drawings: this.state.drawings.concat([{name: "", groupid: this.props.filter[0], heading:""}])});
  },
  render: function() {
    var alreadyRendered = [];
    var nameNodes = this.state.drawings.map(function(name, index) {
      // console.log("My id " + name.groupid + " and filter " + this.props.filter);
      if (name.groupid != this.props.filter){
        return;
      }
      if (this.props.type == "select") {
        if (alreadyRendered.indexOf(name.name) == -1) {
          alreadyRendered.push(name.name);
          return (
              <button className="btn-block" key={index} type="button" onClick={() => this.props.buttonHandler(name.name, name.groupid, name.heading)} key={name.name+name.groupid+name.heading}> {name.name + ": " + name.heading}</button>
          );
        }
      }
      else {
        return (
            <div className="col-xs-12" key={index}>
            <input type="text" value={name.name} onChange = {(e) => this.handleChange(index, name.id, e.target.value, name.groupid, name.heading)}/>
            <input type="text" value={name.heading} onChange = {(e) => this.handleChange(index, name.id, name.name, name.groupid, e.target.value)}/>
            </div>
        );
      }
    }.bind(this));
    return (
        <div className="nameList">
        <div className="row">
        <div className="col-xs-12">
        {nameNodes}
      </div>
      </div>
      <hr/>
        <div className="row">
      {(() => {if (this.props.type == "edit") {
        return (<div className="col-xs-12"><button className="btn-block" type="button" onClick={this.addButtonHandler}>Add Drawing</button>
                <button className="btn-block" type="button" onClick={() => this.props.saveButtonHandler(this.state.drawings)}>Save Changes</button></div>)
      }
               else {
                 return(<div className="col-xs-12">
                        <h3>Kalibrering</h3>
                        <button className="btn-block" type="button" onClick={() => this.props.viewButtonHandler("north")}>Titta åt Norr</button>
                        <hr/>
                        <h3>Vyer</h3>
                        <button className="btn-block" type="button" onClick={() => this.props.viewButtonHandler("park")}>Stå i parken</button>
                        <button className="btn-block" type="button" onClick={() => this.props.viewButtonHandler("heli")}>Flyg i helikopter</button>
                        <button className="btn-block" type="button" onClick={() => this.props.viewButtonHandler("overview")}>Översikt</button>
                        <hr/>
                        <h3>Mall-vyer</h3>
                        <button className="btn-block" type="button" onClick={() => this.props.viewButtonHandler("torget")}>Torget</button>
                        <button className="btn-block" type="button" onClick={() => this.props.viewButtonHandler("entren")}>Entrén</button>
                        <button className="btn-block" type="button" onClick={() => this.props.viewButtonHandler("kulturhuset")}>Kulturhuset</button>
                        <button className="btn-block" type="button" onClick={() => this.props.viewButtonHandler("sparen")}>Spåren</button>
                        </div>
                       )
               }})()}
      </div></div>
    );
  }
});
