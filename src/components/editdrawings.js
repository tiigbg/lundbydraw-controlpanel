import React, { Component } from 'react';
import FilterableNameList from './filterablenamelist';
import $ from 'jquery';

var connection = null;


export default React.createClass({
  loadDrawingsFromServer: function() {
    $.ajax({
      url: "http://hg-web.apache-mysql-lundby.cd66d051.svc.dockerapp.io" + "/getdrawings.php",
      dataType: 'json',
      cache: false,
      success: function(data) {
        // console.log(data);
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  buttonHandler: function(name, groupid, heading) {
    $.post(
       this.props.url + "/setselections.php",
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
  // loadDrawingsFromServer: function() {
  //   r.connect( {host: this.props.url, port: 28015}, function(err, conn) {
  //     if (err) throw err;
  //     connection = conn;
  //     r.db('LundbyDraw').table('drawings').run(connection, function(err, cursor) {
  //      if (err) throw err;
  //       cursor.toArray(function(err, result) {
  //         if (err) throw err;
  //         this.setState({data: result});
  //         console.log(JSON.stringify(result, null, 2));
  //       });
  //     });
  //   })
  // },

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
        <h1>Kontrollpanel för VR</h1>
        <h2>Namn</h2>
        <FilterableNameList data={this.state.data} buttonHandler={this.buttonHandler}/>
      </div>
    );
  }
});