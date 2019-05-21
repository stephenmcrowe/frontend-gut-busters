import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Health from './health';
import FallBack from './fallback';
import mobileLanding from '../containers/landingpage_mobile/landingpage_mobile';

/*
Route                       -> Screen                       Receives:         Emits:
/                           -> health check                 anything          -----
/mobile                     -> landing (mobile)             ----              start game
/mobile/waiting             -> waiting (mobile)             instructions      -----
/mobile/answer/:qstid       -> answer (mobile)              question          answer
/mobile/vote/:qstid         -> vote (mobile)                question          vote
/mobile/score               -> ranking (mobile)             score             none

*/


const App = (props) => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Health} />
          <Route exact path="/mobile" component={mobileLanding} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
