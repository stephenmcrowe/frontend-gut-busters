import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
// import io from 'socket.io-client';
import SocketContext from '../../socket-context';
// import { startGame } from '../../actions';
import './landingpage_desktop.scss';
import logo from '../../img/gut-logo-landing.png';
// import startButton from '../../img/start-game-button.png';

class DesktopLanding extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onStartGame = this.onStartGame.bind(this);
    this.renderLanding = this.renderLanding.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
  }

  onStartGame() {
    console.log(this);
    // event.preventDefault();
    // this.props.startGame(this.state);
    this.props.socket.emit('create_game', {});
  }


  renderLanding() {
    // did assuming whole background image/title/logo is just one image other than the button
    return (
      <div id="landing_desktop">
        <div id="start_game">
          {/* <button type="submit" onClick={this.onStartGame} id="start_game_button"><NavLink to="/waitingDesktop">Start Game</NavLink></button> */}
          <h1>Gut Busters</h1>
          <button onClick={this.onStartGame} type="submit" id="start_game_button"><NavLink to="/desktop/waiting">Start Game</NavLink></button>
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

// { startGame }
// withRouter for location, reference from https://stackoverflow.com/questions/39174814/using-react-router-withrouter
export default withRouter(connect(null, null)(DesktopLandingWithSocket));
