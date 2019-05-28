/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { joinGame, fetchGame } from '../../actions';
import './landingpage_mobile.scss';
import logo from '../../img/gut-logo.svg';
import SocketContext from '../../socket-context';

// connect to socket
const socketserver = 'http://localhost:9090';

class MobileLanding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomCode: '',
      playerName: '',
    };
  }

  componentDidMount = () => {
    fetchGame(this.props.socket);
  }

  joinGameClick(event) {
    event.preventDefault();
    joinGame(this.props.socket, this.props.history);
  }

  roomCodeChange(event) {
    this.setState({ roomCode: event.target.value });
  }

  playerNameChange(event) {
    this.setState({ playerName: event.target.value });
  }

  render() {
    return (
      <div className="landing-page">
        <div className="landing-title">
          <h1>Gut Busters</h1>
        </div>
        <div className="landing-logo">
          {/* <div className="base-logo" /> */}
          <img src={logo} alt="Gut Busters" />
        </div>
        <div className="landing-inputs">
          <input className="roomcode-input" type="text" placeholder="room code..." onChange={this.roomCodeChange} value={this.state.roomCode} />
          <input className="playername-input" type="text" placeholder="playername..." onChange={this.playerNameChange} value={this.state.playerName} />
        </div>
        <div className="join-game">
          <button type="submit" onClick={this.joinGameClick} className="join-game-button"><NavLink to="/mobile/waiting" className="join-game"><p>Join!</p></NavLink></button>
        </div>
      </div>
    );
  }
}

const MobileLandingWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <MobileLanding {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default withRouter(connect(null, { joinGame, fetchGame })(MobileLandingWithSocket));
