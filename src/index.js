import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dashboard from './Dashboard';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-92772547-2');
ReactGA.pageview(window.location.pathname + window.location.search);

// ========================================

ReactDOM.render(

  <Dashboard />,
  document.getElementById('root')
);

