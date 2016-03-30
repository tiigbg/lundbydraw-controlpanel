import React, { Component } from 'react';
import ControlBox from './components/controlbox';

export default class App extends Component {
  render() {
    return (
      // <ControlBox url="http://rethinkdb-proxy.rethinkdb-tutum-stackfile.f89f1453.svc.dockerapp.io"/>
        <ControlBox url="http://hg-web.apache-mysql-lundby.cd66d051.svc.dockerapp.io"/>
    );
  }
}
