import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './vote_desktop.scss';
import SocketContext from '../../socket-context';
import { fetchGame } from '../../actions';

class DesktopVoting extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.fetchGame(this.props.socket);
  }

  // props.round will be instantiated once connected to backend
  render() {
    return (
      <div className="voting_page">
        <h1>Round
          {this.props.round}
        </h1>
        <h2>Voting in Progress...</h2>
        <div id="dots">
          <div id="dot_1">.</div>
          <div id="dot_2">.</div>
          <div id="dot_3">.</div>
        </div>
      </div>

    );
  }
}

const DesktopVotingWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <DesktopVoting {...props} socket={socket} />}
  </SocketContext.Consumer>
);


export default withRouter(connect(null, { fetchGame })(DesktopVotingWithSocket));
