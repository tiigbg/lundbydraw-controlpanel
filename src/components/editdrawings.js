import React, { Component } from 'react';
import FilterableNameList from './filterablenamelist';
import NameList from './namelist.js';
import $ from 'jquery';

var connection = null;

// var URL = "http://192.168.99.100"

export default React.createClass({
  loadDrawingsFromServer: function() {
    $.ajax({
      url: "/php/getdrawings.php",
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
    console.log(drawing);
    $.post(
     URL + "/php/updatedrawings.php",
      {   // Data Sending With Request To Server
        drawings:drawings
      },
      function(e){
        console.log("Success? " + e + " and " + drawings);
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
      <div className="commentBox">
        <h1>Kontrollpanel2 för VR</h1>
        <h2>Namn</h2>
        <FilterableNameList data={this.state.data}>
            <NameList data={this.state.data} saveButtonHandler={this.saveButtonHandler} type="edit"/>
        </FilterableNameList>
        </div>
    );
  }
});
