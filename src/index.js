import React from 'react';
import ReactDOM from 'react-dom';
// using an ES6 transpiler, like babel
import { Router, Route, Link, browserHistory } from 'react-router';

import ControlBox from './components/controlbox';
import EditDrawings from './components/editdrawings';


ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={ControlBox}/>
            <Route path="edit" component={EditDrawings}/>
    </Router>
), document.getElementById('root'));
