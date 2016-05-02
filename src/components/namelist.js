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
    var nameNodes = this.state.drawings.map(function(name, index) {
      // console.log("My id " + name.groupid + " and filter " + this.props.filter);
      if (name.groupid != this.props.filter){
        return;
      }
      if (this.props.type == "select") {
        return (
            <div className="col-xs-12" key={index}>
            <button className="btn-block" type="button" onClick={() => this.props.buttonHandler(name.name, name.groupid, name.heading)} key={name.name+name.groupid+name.heading}> {name.name + ": " + name.heading}</button>
            </div>
        );
      }
      else {
        var radioNodes = ["torget", "entren", "kulturhuset", "sparen"].map(function(view, headingindex) {
            return(
                <div className="col-xs-2" key={headingindex + " and " + (name.heading === view).toString()}>
                <input key={index} type="radio" name={view}
                    value={view}
                    checked={name.heading === view}
              onChange={(e) => this.handleChange(index, name.id, name.name, name.groupid, e.currentTarget.value)}/> {view}
              </div>
          );
        }.bind(this));
        return (
            <div className="col-xs-12" key={index}>
            <input className="col-xs-4" type="text" value={name.name} onChange = {(e) => this.handleChange(index, name.id, e.target.value, name.groupid, name.heading)}/>
            {radioNodes}
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
        return (<div className="col-xs-12"><button className="btn-block" type="button" onClick={this.addButtonHandler}>Add Drawing</button>
                <button className="btn-block" type="button" onClick={() => this.props.saveButtonHandler(this.state.drawings)}>Save Changes</button></div>)
      }
               else {
                 return(<div className="col-xs-12"><button className="btn-block" type="button" onClick={() => this.props.viewButtonHandler("north")}>Titta åt Norr</button>
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
