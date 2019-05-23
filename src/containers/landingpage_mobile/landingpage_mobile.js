/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import io from 'socket.io-client';
import { joinGame } from '../../actions';
import './landingpage_mobile.scss';
import logo from '../../img/gut-logo.svg';

// connect to socket
const socketserver = 'http://localhost:9090';

class mobileLanding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomCode: '',
      playerName: '',
    };

    console.log(socketserver);
    this.socket = io(socketserver);
    this.socket.on('connect', () => { console.log('socket.io connected'); });
    this.socket.on('disconnect', () => { console.log('socket.io disconnected'); });
    this.socket.on('reconnect', () => { console.log('socket.io reconnected'); });
    this.socket.on('error', (error) => { console.log(error); });

    this.joinGameClick = this.joinGameClick.bind(this);
    this.roomCodeChange = this.roomCodeChange.bind(this);
    this.playerNameChange = this.playerNameChange.bind(this);
  }

  componentDidMount = () => {
    this.socket.on('create_game', (game) => {
      console.log(game);
    });
  }

  joinGameClick(event) {
    event.preventDefault();
    this.props.joinGame(this.props.history);
    this.socket.emit('create_game', {});
    // will be taken from server via actions
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

export default withRouter(connect(null, { joinGame })(mobileLanding));
