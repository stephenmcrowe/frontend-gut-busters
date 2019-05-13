import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Display from './display';
// import Controls from '../containers/controls';

const App = (props) => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Display} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
