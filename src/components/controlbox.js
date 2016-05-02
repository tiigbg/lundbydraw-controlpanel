import React, { Component } from 'react';
import FilterableNameList from './filterablenamelist';
import NameList from './namelist';
import $ from 'jquery';

var connection = null;

var URL = "http://web.lundbydraw-apache-mysql.aa2638b9.svc.dockerapp.io/";

export default React.createClass({
  loadDrawingsFromServer: function() {
    $.ajax({
      url: URL + "/php/getdrawings.php",
      dataType: 'json',
      cache: false,
      success: function(data) {
        // console.log(data);
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("Welp", status, err.toString());
      }.bind(this)
    });
  },
  buttonHandler: function(name, groupid, heading) {
    $.post(
       URL + "/php/setselections.php",
      {   // Data Sending With Request To Server
        name:name,
        groupid:groupid,
        heading:heading
      },
      function(e){
        console.log("Success? " + e + " and " + name + " " + groupid + " " + heading);
      }
    );
  },
  viewButtonHandler: function(view) {
    $.post(
      URL + "/php/setview.php",
      {   // Data Sending With Request To Server
        view:view
      },
      function(e){
        console.log("Success? " + e + " and " + view);
      }
    );
  },
  getInitialState: function() {
    return {data: [
      {"name": "Pete Hunt", "groupid": 0, "heading": "w"},
      {"name": "Jordan Walke", "groupid": 1, "heading": "s"}
    ]};
  },
  componentDidMount: function() {
    this.loadDrawingsFromServer();
    // setInterval(this.loadDrawingsFromServer, 2100);
  },
  render: function() {
    return (
      <div className="container commentBox">
        <h1>Kontrollpanel för VR</h1>
        <h3>Namn</h3>
        <FilterableNameList data={this.state.data}>
        <NameList data={this.state.data} buttonHandler={this.buttonHandler} viewButtonHandler={this.viewButtonHandler} type="select"/>
        </FilterableNameList>
      </div>
    );
  }
});
