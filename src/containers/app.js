/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import SocketContext from '../socket-context';
import FallBack from '../components/fallback';
import { setGame, setVote } from '../actions/index';

import HomepageWithSocket from '../components/homepage/homepage';
import MobileLandingWithSocket from './landingpage_mobile/landingpage_mobile';
import MobileWaitingWithSocket from './waiting_mobile/waiting_mobile';
import MobileAnswerWithSocket from './answer_mobile/answer_mobile_doublequestion';
import MobileVoteWithSocket from './vote_mobile/vote_mobile';
import MobileScoreWithSocket from './score_mobile/score_mobile';
// import { mobileScore, mobileAnswer, mobileVote } from '../containers/score_mobile/score_mobile';
// import mobileAnswer from '../containers/score_mobile/score_mobile';
// import mobileVote from '../containers/score_mobile/score_mobile';
// import mobileScore from '../containers/score_mobile/score_mobile';

import DesktopLandingWithSocket from './landingpage_desktop/landingpage_desktop';
import DesktopWaitingWithSocket from './waiting_desktop/waiting_desktop';
import DesktopScoreWithSocket from './score_desktop/score_desktop';
import DesktopRoundScoreWithSocket from './roundscore_desktop/roundscore_desktop';
import DesktopAnswerWithSocket from './answer_desktop/answerquestion_desktop';
import DesktopVotingWithSocket from './vote_desktop/vote_desktop';
import DesktopVoteResultWithSocket from './vote_results/vote_results';

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

    this.props.socket.on('vote', (index) => {
      console.log(`app component index: ${index}`);
      this.props.setVote(index);
    });

    this.props.socket.on('game', (game) => {
      console.log(`app component game: ${game}`);
      this.props.setGame(game);
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={HomepageWithSocket} />
            <Route exact path="/mobile" component={MobileLandingWithSocket} />
            <Route exact path="/mobile/waiting" component={MobileWaitingWithSocket} />
            <Route path="/mobile/answer" component={MobileAnswerWithSocket} />
            {/* Above path is temporary, until we have ids */}
            <Route path="/mobile/answer/:id" component={MobileAnswerWithSocket} />
            <Route path="/mobile/vote" component={MobileVoteWithSocket} />
            {/* Above path is temporary, until we have ids */}
            <Route path="/mobile/vote/:id" component={MobileVoteWithSocket} />
            <Route exact path="/mobile/score" component={MobileScoreWithSocket} />

            <Route exact path="/desktop" component={DesktopLandingWithSocket} />
            <Route exact path="/desktop/waiting" component={DesktopWaitingWithSocket} />
            <Route path="/desktop/answer" component={DesktopAnswerWithSocket} />
            {/* Above path is temporary, until we have ids */}
            <Route path="/desktop/answer/:id" component={DesktopAnswerWithSocket} />
            <Route path="/desktop/vote" component={DesktopVotingWithSocket} />
            <Route path="/desktop/voteresult" component={DesktopVoteResultWithSocket} />
            {/* Above path is temporary, until we have ids */}
            <Route path="/desktop/voteresult/:id" component={DesktopVoteResultWithSocket} />
            <Route exact path="/desktop/roundscore" component={DesktopRoundScoreWithSocket} />
            <Route exact path="/desktop/score" component={DesktopScoreWithSocket} />
            <Route component={FallBack} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const AppWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <App {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default connect(null, { setGame, setVote })(AppWithSocket);
