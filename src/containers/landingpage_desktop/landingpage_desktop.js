import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import SocketContext from '../../socket-context';
import './landingpage_desktop.scss';
import logo from '../../img/gut-logo-landing.png';
import { createGame } from '../../actions/submitActions';

class DesktopLanding extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onCreateGame = this.onCreateGame.bind(this);
    this.renderLanding = this.renderLanding.bind(this);
  }

  onCreateGame() {
    createGame(this.props.socket);
  }

  renderLanding() {
    return (
      <div id="landing_desktop">
        <div id="start_game">
          <h1>Gut Busters</h1>
          <button onClick={this.onCreateGame} type="button" id="start_game_button"><NavLink to="/desktop/waiting">Start Game</NavLink></button>
        </div>
        <div id="background">
          <img className="logo-img" src={logo} alt="Gut Busters" />
        </div>
      </div>
    );
  }


  render() {
    return (
      <nav>
        <div className="landingPage">
          {this.renderLanding()}
        </div>
      </nav>
    );
  }
}

const DesktopLandingWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <DesktopLanding {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default withRouter(connect(null)(DesktopLandingWithSocket));
