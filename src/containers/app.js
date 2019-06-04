/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */

import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Switch, NavLink,
} from 'react-router-dom';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import SocketContext from '../socket-context';
import FallBack from '../components/fallback';
import { setGame, setVote } from '../actions/index';

import HomepageWithSocket from '../components/homepage/homepage';
import MobileLandingWithSocket from './landingpage_mobile/landingpage_mobile';
import MobileWaitingWithSocket from './waiting_mobile/waiting_mobile';
import MobileAnswerWithSocket from './answer_mobile/answer_mobile_doublequestion';
import MobileVoteWithSocket from './vote_mobile/vote_mobile';
import MobileScoreWithSocket from './score_mobile/score_mobile';

import DesktopLandingWithSocket from './landingpage_desktop/landingpage_desktop';
import DesktopWaitingWithSocket from './waiting_desktop/waiting_desktop';
import DesktopScoreWithSocket from './score_desktop/score_desktop';
import DesktopAnswerWithSocket from './answer_desktop/answerquestion_desktop';
import DesktopVotingWithSocket from './vote_desktop/vote_desktop';
import DesktopVoteResultWithSocket from './vote_results/vote_results';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };

    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount = () => {
    this.props.socket.on('vote', (index) => {
      console.log(`app component index: ${index}`);
      this.props.setVote(index);
    });

    this.props.socket.on('game', (game) => {
      console.log('app component game:');
      this.props.setGame(game);
    });

    this.props.socket.on('disconnect', () => {
      this.setState({ showModal: true });
    });
  }

  componentWillUnmount = () => {
    this.props.socket.off('vote');
    this.props.socket.off('game');
    this.props.socket.off('disconnect');
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }


  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={HomepageWithSocket} />

            {/* Mobile routes */}
            <Route exact path="/mobile" component={MobileLandingWithSocket} />
            <Route exact path="/mobile/waiting" component={MobileWaitingWithSocket} />
            <Route path="/mobile/answer" component={MobileAnswerWithSocket} />
            <Route path="/mobile/vote" component={MobileVoteWithSocket} />
            <Route exact path="/mobile/score" component={MobileScoreWithSocket} />

            {/* Desktop routes */}
            <Route exact path="/desktop" component={DesktopLandingWithSocket} />
            <Route exact path="/desktop/waiting" component={DesktopWaitingWithSocket} />
            <Route path="/desktop/answer" component={DesktopAnswerWithSocket} />
            <Route path="/desktop/vote" component={DesktopVotingWithSocket} />
            <Route path="/desktop/voteresult" component={DesktopVoteResultWithSocket} />
            <Route exact path="/desktop/score" component={DesktopScoreWithSocket} />

            <Route component={FallBack} />
          </Switch>
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="socket disconnect"
          >
            <h1>Server Disconnect</h1>
            <p>Your web client has disconnect from the server (the socket connection has closed). There is nothing we can do. Please return to the home page.</p>
            <NavLink to="/" className="home-page">
              <button onClick={this.handleCloseModal}>EXIT</button>
            </NavLink>
          </ReactModal>
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
