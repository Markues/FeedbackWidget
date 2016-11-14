import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import ParentComponent from './components/ParentComponent';

export default (
  <Route component={App}>
    <Route path='/home' component={ParentComponent} />
  </Route>
);
