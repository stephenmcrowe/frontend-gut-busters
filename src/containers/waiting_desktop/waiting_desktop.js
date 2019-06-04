/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import './waiting_desktop.scss';
import { startGame } from '../../actions/submitActions';
import SocketContext from '../../socket-context';

class DesktopWaiting extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onStartRound = this.onStartRound.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  onStartRound() {
    if (this.props.game) {
      startGame(this.props.socket, this.props.game.id);
    }
  }

  renderPlayers = () => {
    if (this.props.game) {
      const players = this.props.game.players.map((player) => {
        return (
          <div key={player.id}>{player.name}</div>
        );
      });
      return players;
    }
    return '';
  }

  gameCode() {
    return this.props.game ? this.props.game.code : '';
  }

  renderPage() {
    return (
      <div id="waiting">
        <div id="room_code">
          <h1>Room Code: {this.gameCode()}</h1>
        </div>
        <div id="Waiting_cap">
          <h3>Waiting for players.... </h3>
          {this.renderPlayers()}
        </div>
      </div>
    );
  }

  renderButton() {
    return (
      <div id="start_round_button">
        <button onClick={this.onStartRound} type="submit" id="start_round"><NavLink to="/desktop/answer">Start Round</NavLink></button>
      </div>
    );
  }

  render() {
    return (
      <div id="waiting-room-page">
        {this.renderPage()}
        {this.renderButton()}
      </div>
    );
  }
}

const DesktopWaitingWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <DesktopWaiting {...props} socket={socket} />}
  </SocketContext.Consumer>
);

function mapStateToProps(reduxState) {
  return {
    game: reduxState.socket.game,
  };
}

export default withRouter(connect(mapStateToProps, null)(DesktopWaitingWithSocket));
