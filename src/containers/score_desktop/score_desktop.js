import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { restartGame } from '../../actions';
import './score_desktop.scss';

// Data needed (receive):
// props.player array with each player having player.score

// still need to be made fully applicable for variable number of players

class desktopScore extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onRestartGame = this.onRestartGame.bind(this);
  }

  onRestartGame() {
    this.props.restartGame(this.state);
  }

  render() {
    return (
      <div className="desktop-score-page">
        <div className="game-winner">
          <h1>{this.props.player.find(1)} won because ghouls
                        just want to have fun!
          </h1>
        </div>
        <div className="full-rank">
          <div className="final-rankings">
            <h3>1</h3>
            <h3>{this.props.player.find(1)}</h3>
            <h3>{this.props.player.find(1).score}</h3>
          </div>
          <div className="final-rankings">
            <h3>2</h3>
            <h3>{this.props.player.find(2)}</h3>
            <h3>{this.props.player.find(2).score}</h3>
          </div>
          <div className="final-rankings">
            <h3>3</h3>
            <h3>{this.rops.player.find(3)}</h3>
            <h3>{this.props.player.find(3).score}</h3>
          </div>
          <div className="final-rankings">
            <h3>4</h3>
            <h3>{this.props.player.find(4)}</h3>
            <h3>{this.props.player.find(4).score}</h3>
          </div>
        </div>
        <div className="playagain-button">
          <button onClick={this.onRestartGame} type="submit" id="restart-game-button"><NavLink to="/landingDesktop">Play Again</NavLink></button>
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

export default withRouter(connect(mapStateToProps, { restartGame })(desktopScore));
