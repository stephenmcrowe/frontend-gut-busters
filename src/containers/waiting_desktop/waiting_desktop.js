/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import './waiting_desktop.scss';
import { startGame, fetchGame } from '../../actions';
// import { fetchGame, startGame } from '../../actions';
// import { startGame } from '../../actions';
import SocketContext from '../../socket-context';

/*
listens for players coming in
store player info as local state for now
Navlink to start round aka questions
*/

// start_game

/* will get posts eventually
function mapStateToProps(reduxState) {
  // console.log(reduxState);
  return {
    room_id: reduxState.game.id,
    players: reduxState.game.players,
  };
}
*/

class DesktopWaiting extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onStartRound = this.onStartRound.bind(this);
    this.renderPage = this.renderPage.bind(this);
    // this.renderPlayers = this.renderPlayers.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }


  componentDidMount() {
    this.props.fetchGame(this.props.socket);
  }


  onStartRound() {
    // event.preventDefault();
    if (this.props.game) {
      this.props.startGame(this.props.socket, this.props.game.id);
    }
  }

  onButtonClick = () => {
    console.log(this.props.game);
  }

  renderPlayers = () => {
    if (this.props.game) {
      const players = this.props.game.players.map((player) => {
        return (
          <div key={player}>{player}</div>
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
    // did assuming whole background image/title/logo is just one image other than the button
    return (
      <div id="waiting">
        <div id="room code">
          <h1>Room Code: {this.gameCode()}</h1>
          <button type="button" onClick={this.onButtonClick}>Test props</button>
        </div>
        <div id="Waiting_cap">
          <h1>Waiting for players.... </h1>
          {this.renderPlayers()}
        </div>
      </div>
    );
  }

  renderButton() {
    // did assuming whole background image/title/logo is just one image other than the button
    return (
      <div id="start_round_button">
        <button onClick={this.onStartRound} type="submit" id="start_round"><NavLink to="/desktop/answer">Start Round</NavLink></button>
      </div>

    );
  }

  /*
  // did assuming whole background image/title/logo is just one image other than the button
    // need to comeback and make sure that the components name match with the model

    div className="player_section" key={player._id}>
          <img alt="player_img" />
          <h2 className="name">{player.name}</h2>
        </div>
        */

  render() {
    // return (
    // this.props.players.map((player) => {
    return (
      <div id="waiting-room-page">
        {this.renderPage()}
        {this.renderButton()}
      </div>

    );
    // })
    // );
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

export default withRouter(connect(mapStateToProps, { fetchGame, startGame })(DesktopWaitingWithSocket));
