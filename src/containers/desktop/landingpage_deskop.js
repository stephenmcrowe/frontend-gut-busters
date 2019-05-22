import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { startGame } from '../../actions';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onStartGame = this.onStartGame.bind(this);
    this.renderLanding = this.renderLanding.bind(this);
  }

  onStartGame() {
    event.preventDefault();
    this.props.startGame(this.state);
  }

  renderLanding() {
    // did assuming whole background image/title/logo is just one image other than the button
    return (
      <div id="landing_desktop">
        <div id="background">
          <div className="logo_title_img" />
        </div>
        <div id="start_game">
          <button onClick={this.onStartGame} id="start_game_button"><NavLink to="/waitingDesktop">Start Game</NavLink></button>
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


// withRouter for location, reference from https://stackoverflow.com/questions/39174814/using-react-router-withrouter
export default withRouter(connect(Null, { startGame })(LandingPage));
