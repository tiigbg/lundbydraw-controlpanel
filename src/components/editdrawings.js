import React, { Component } from 'react';
import FilterableNameList from './filterablenamelist';
import NameList from './namelist.js';
import $ from 'jquery';

var connection = null;

var URL = "http://web.lundbydraw-apache-mysql.aa2638b9.svc.dockerapp.io";

export default React.createClass({
  loadDrawingsFromServer: function() {
    $.ajax({
      url: URL+ "/php/getdrawings.php",
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
  saveButtonHandler: function(drawings) {
    console.log(drawings);
    $.ajax
    ({
      type: "POST",
      //the url where you want to sent the userName and password to
      url: URL + "/php/updatedrawings.php",
      dataType: 'json',
      async: true,
      //json object to sent to the authentication url
      data: JSON.stringify({drawings: drawings}),
      success: function (e) {
        console.log("Success? " + e + " and " + drawings);
      }
    });
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
        <h3>Redigera teckningsinformation</h3>
        <h2>Namn</h2>
        <FilterableNameList data={this.state.data}>
            <NameList data={this.state.data} saveButtonHandler={this.saveButtonHandler} type="edit"/>
        </FilterableNameList>
        </div>
    );
  }
});
