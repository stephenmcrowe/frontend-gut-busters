import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Health from './health';
import FallBack from './fallback';

const App = (props) => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Health} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
