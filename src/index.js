import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// using an ES6 transpiler, like babel
import { Router, Route, Link } from 'react-router';

import ControlBox from './components/controlbox';
import EditDrawings from './components/editdrawings';


  ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Controlbox}>
      <Route path="edit" component={EditDrawings}/>
    </Route>
  </Router>
  ), document.getElementById('root'));
