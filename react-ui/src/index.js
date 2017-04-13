import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';

import App from './component/App';
import './style/index.css';


ReactDOM.render(
  <BrowserRouter>
    <Route path="/:key" render={({ match }) => {
      return <App testprop={true} />
    }} />
  </BrowserRouter>,
  document.getElementById('root')
);
