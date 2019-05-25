import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import SocketContext from '../../socket-context';
//  import { endRounds } from '../../actions';
// import './roundscore_desktop.scss';

// Data needed (receive):
// props.player array with each player having player.score from round
// some kind of joke at the top

class DesktopRoundScore extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onNextRound = this.onNextRound.bind(this);
  }

  onNextRound() {
    this.props.endRounds(this.state);
  }

  // {this.props.player.find(1)}

  // not super sure about the round title, becauseI don't know if we have anything keeping track of number of rounds???
  // {joke api will be here}

  /*
  <h3>{this.props.player.find(1)}</h3>
  <h3>{this.props.round.player.find(1).score}</h3>

  <h3>{this.props.player.find(2)}</h3>
  <h3>{this.props.round.player.find(2).score}</h3>


  <h3>{this.rops.player.find(3)}</h3>
  <h3>{this.props.round.player.find(3).score}</h3>

  <h3>{this.props.player.find(4)}</h3>
  <h3>{this.props.round.player.find(4).score}</h3>
  */


  render() {
    return (
      <div className="round-score-page">
        <div className="round-title">
          <div className="round-num">
            <h1> Round round_number_here</h1>
          </div>
          <div className="joke">
            <h2>joke to be inserted here</h2>
          </div>
        </div>
        <div className="player-scores">
          <div className="player-round-score">
            <h1>player 1</h1>
            <img alt="player_img1" />

          </div>
          <div className="player-round-score">
            <h1>player 2</h1>
            <img alt="player_img2" />

          </div>
          <div className="player-round-score">
            <h1>player 3</h1>
            <img alt="player_img3" />
          </div>
          <div className="player-round-score">
            <h1>player 4</h1>
            <img alt="player_img4" />
          </div>
        </div>
        <div className="next-button">
          <button onClick={this.onNextRound} type="submit" id="next-round-button"><NavLink to="/desktop/score" /></button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    player: state.player,
    game: state.game,
  }
);

const DesktopRoundScoreWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <DesktopRoundScore {...props} socket={socket} />}
  </SocketContext.Consumer>
);

// { endRounds }
export default withRouter(connect(mapStateToProps, null)(DesktopRoundScoreWithSocket));
