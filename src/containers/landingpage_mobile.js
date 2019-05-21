/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { joinGame } from '../actions';

class mobileLanding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomCode: '',
      playerName: '',
    };

    this.joinGameClick = this.joinGameClick.bind(this);
    this.roomCodeChange = this.roomCodeChange.bind(this);
    this.playerNameChange = this.playerNameChange.bind(this);
  }

  joinGameClick(event) {
    event.preventDefault();
    this.props.joinGame(this.props.history);
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
      <div id="mobileLanding-Wrapper">
        <div id="titleNlogo">
          <div id="landingTitle">
            <h1>Gut Busters</h1>
          </div>
          <div id="landingLogo">
            <div className="baseLogo" />
          </div>
        </div>
        <div id="landingInputs">
          <input className="roomcode-input" type="text" placeholder="room code..." onChange={this.roomCodeChange} value={this.state.roomCode} />
          <input className="playername-input" type="text" placeholder="playername..." onChange={this.playerNameChange} value={this.state.playerName} />
        </div>
        <div id="join-game">
          <button onClick={this.joinGameClick} id="join-game-button"><NavLink to="/">Join!</NavLink></button>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { joinGame })(mobileLanding));
