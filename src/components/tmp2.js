/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
// import io from 'socket.io-client';
// import SocketContext from
import Health from './health';
import FallBack from './fallback';

import mobileLanding from '../containers/landingpage_mobile/landingpage_mobile';
import mobileWaiting from '../containers/waiting_mobile/waiting_mobile';
import mobileAnswer from '../containers/answer_mobile/answer_mobile';
import mobileVote from '../containers/vote_mobile/vote_mobile';
import mobileScore from '../containers/score_mobile/score_mobile';

// import { mobileScore, mobileAnswer, mobileVote } from '../containers/score_mobile/score_mobile';
// import mobileAnswer from '../containers/score_mobile/score_mobile';
// import mobileVote from '../containers/score_mobile/score_mobile';
// import mobileScore from '../containers/score_mobile/score_mobile';

import desktopLanding from '../containers/landingpage_desktop/landingpage_desktop';
import desktopWaiting from '../containers/waiting_desktop/waiting_desktop';
import desktopScore from '../containers/score_desktop/score_desktop';
import desktopRoundScore from '../containers/roundscore_desktop/roundscore_desktop';
import desktopAnswer from '../containers/answer_desktop/answerquestion_desktop';
import desktopVote from '../containers/vote_desktop/vote_desktop';
import desktopVoteResult from '../containers/vote_results/vote_results';

/*
Route                       -> Screen                       Receives:         Emits:
/                           -> health check                 anything          -----
/mobile                     -> landing (mobile)             ----              start game
/mobile/waiting             -> waiting (mobile)             instructions      -----
/mobile/answer/:qstid       -> answer (mobile)              question          answer
/mobile/vote/:qstid         -> vote (mobile)                question          vote
/mobile/score               -> ranking (mobile)             score             none

/desktop                   -> landing (desktop)             ----              start game
/desktop/waiting             -> waiting (desktop)           players, roomid   start round
/desktop/answer/:qstid       -> answer (desktop)            answersin/done           -----
/desktop/vote/:qstid         -> vote (desktop)              answers           votes
/desktop/score               -> ranking (desktop)           players           ----
/desktop/final               -> ranking (desktop)           playerscores      start game
*/
// connect to socket
// const socketserver = 'http://localhost:9090';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // set up socket
    // console.log(socketserver);
    // this.socket = io(socketserver);
    // this.socket.on('connect', () => { console.log('socket.io connected'); });
    // this.socket.on('disconnect', () => { console.log('socket.io disconnected'); });
    // this.socket.on('reconnect', () => { console.log('socket.io reconnected'); });
    // this.socket.on('error', (error) => { console.log(error); });
  }

  // set up socket on componentDidMount()
  componentDidMount = () => {
    this.socket.on('create_game', (game) => {
      console.log(game);
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Health} />
            <Route exact path="/mobile" component={mobileLanding} />
            <Route exact path="/mobile/waiting" component={mobileWaiting} />
            <Route path="/mobile/answer" component={mobileAnswer} />
            {/* Above path is temporary, until we have ids */}
            <Route path="/mobile/answer/:id" component={mobileAnswer} />
            <Route path="/mobile/vote" component={mobileVote} />
            {/* Above path is temporary, until we have ids */}
            <Route path="/mobile/vote/:id" component={mobileVote} />
            <Route exact path="/mobile/score" component={mobileScore} />

            <Route exact path="/desktop" component={desktopLanding} />
            <Route exact path="/desktop/waiting" component={desktopWaiting} />
            <Route path="/desktop/answer" component={desktopAnswer} />
            {/* Above path is temporary, until we have ids */}
            <Route path="/desktop/answer/:id" component={desktopAnswer} />
            <Route path="/desktop/voting" component={desktopVote} />
            <Route path="/desktop/voteresult" component={desktopVoteResult} />
            {/* Above path is temporary, until we have ids */}
            <Route path="/desktop/voteresult/:id" component={desktopVoteResult} />
            <Route exact path="/desktop/roundscore" component={desktopRoundScore} />
            <Route exact path="/desktop/score" component={desktopScore} />
            <Route component={FallBack} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
