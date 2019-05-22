import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Health from './health';
import FallBack from './fallback';
import mobileLanding from '../containers/landingpage_mobile/landingpage_mobile';
import mobileWaiting from '../containers/waiting_mobile/waiting_mobile';
// import { mobileScore, mobileAnswer, mobileVote } from '../containers/score_mobile/score_mobile';
// import mobileAnswer from '../containers/score_mobile/score_mobile';
// import mobileVote from '../containers/score_mobile/score_mobile';
// import mobileScore from '../containers/score_mobile/score_mobile';


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
          <Route exact path="/mobile/answer/waiting" component={mobileWaiting} />
          <Route path="/mobile/answer/:id" component={mobileLanding} />
          <Route path="/mobile/vote/:id" component={mobileLanding} />
          {/* <Route exact path="/mobile/score" component={mobileScore} /> */}
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
