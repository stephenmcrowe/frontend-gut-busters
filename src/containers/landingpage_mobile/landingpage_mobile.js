/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { joinGame, receiveJoinGame } from '../../actions/submitActions';
import './landingpage_mobile.scss';
import logo from '../../img/gut-logo.svg';
import SocketContext from '../../socket-context';

class MobileLanding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomCode: '',
      playerName: '',
      error: '',
    };

    // bindings
    this.roomCodeChange = this.roomCodeChange.bind(this);
    this.playerNameChange = this.playerNameChange.bind(this);
    this.joinGameClick = this.joinGameClick.bind(this);
  }

  componentDidMount() {
    receiveJoinGame(this.props.socket);

    this.props.socket.on('join_game', () => {
      this.props.history.push('/mobile/waiting');
    });
    this.props.socket.on('user_error', (message) => {
      this.setState({ error: message });
    });
  }

  componentWillUnmount() {
    this.props.socket.off('join_game');
    this.props.socket.off('user_error');
  }

  joinGameClick(event) {
    const code = this.state.roomCode;
    const name = this.state.playerName;
    this.props.socket.emit('join_game', { code, name });
    this.setState({ error: '' });
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
          <button type="submit" onClick={this.joinGameClick} className="join-game-button"><p>Join!</p></button>
        </div>
        <p>{this.state.error}</p>
      </div>
    );
  }
}

const MobileLandingWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <MobileLanding {...props} socket={socket} />}
  </SocketContext.Consumer>
);


export default withRouter(connect(null)(MobileLandingWithSocket));
