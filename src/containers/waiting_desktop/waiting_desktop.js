/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { startRound } from '../../actions';
import './waiting_desktop.scss';

/*
listens for players coming in
store player info as local state for now
Navlink to start round aka questions
*/


/* will get posts eventually
function mapStateToProps(reduxState) {
  // console.log(reduxState);
  return {
    room_id: reduxState.game.id,
    players: reduxState.game.players,
  };
}
*/

class waitingroom_desktop extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onStartRound = this.onStartRound.bind(this);
    this.renderPage = this.renderPage.bind(this);
    // this.renderPlayers = this.renderPlayers.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }


  /* componentDidMount() {
    this.props.getPlayers();
  }
  */

  onStartRound() {
    // event.preventDefault();
    this.props.startRound(this.state);
  }

  renderPage() {
    // did assuming whole background image/title/logo is just one image other than the button
    return (
      <div id="waiting_room">
        <div id="room_code">
          <h1>Room Code: </h1>
          { this.props.room_id}
        </div>
        <div id="Waiting_cap">
          <h3>Waiting for players.... </h3>
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

export default withRouter(connect(null, { startRound })(waitingroom_desktop));
