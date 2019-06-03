/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import './waiting_desktop.scss';
import { fetchGame } from '../../actions/index';
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


  componentDidMount() {
    this.props.fetchGame(this.props.socket);
  }


  onStartRound() {
    if (this.props.game) {
      startGame(this.props.socket, this.props.game.id);
    }
  }

  onButtonClick = () => {
    console.log(this.props.game);
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
    // did assuming whole background image/title/logo is just one image other than the button
    return (
      <div id="waiting">
        <div id="room_code">
          <h1>Room Code: {this.gameCode()}</h1>
          {/* <button type="button" onClick={this.onButtonClick}>Test props</button> */}
        </div>
        <div id="Waiting_cap">
          <h3>Waiting for players.... </h3>
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

export default withRouter(connect(mapStateToProps, { fetchGame })(DesktopWaitingWithSocket));
