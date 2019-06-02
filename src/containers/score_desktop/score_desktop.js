import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { fetchGame } from '../../actions/index';
import { createGame } from '../../actions/submitActions';
import './score_desktop.scss';
import SocketContext from '../../socket-context';

class DesktopScore extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onRestartGame = this.onRestartGame.bind(this);
  }

  componentDidMount() {
    this.props.fetchGame(this.props.socket);
  }

  onRestartGame() {
    createGame(this.props.socket);
  }

  // render() {
  //   return (
  //     <div className="desktop-score-page">
  //       <div className="game-winner-Wrapper">
  //         <div className="game-winner">
  //           <h1>{this.props.player.find(1)} won because ghouls
  //                       just want to have fun!
  //           </h1>
  //         </div>
  //       </div>
  //       <div className="full-rank">
  //         <div className="final-rankings">
  //           <h3>1</h3>
  //           <h3>{this.props.player.find(1)}</h3>
  //           <h3>{this.props.player.find(1).score}</h3>
  //         </div>
  //         <div className="final-rankings">
  //           <h3>2</h3>
  //           <h3>{this.props.player.find(2)}</h3>
  //           <h3>{this.props.player.find(2).score}</h3>
  //         </div>
  //         <div className="final-rankings">
  //           <h3>3</h3>
  //           <h3>{this.rops.player.find(3)}</h3>
  //           <h3>{this.props.player.find(3).score}</h3>
  //         </div>
  //         <div className="final-rankings">
  //           <h3>4</h3>
  //           <h3>{this.props.player.find(4)}</h3>
  //           <h3>{this.props.player.find(4).score}</h3>
  //         </div>
  //       </div>
  //       <div className="playagain-button">
  //         <button onClick={this.onRestartGame} type="submit" id="restart-game-button"><NavLink to="/landingDesktop">Play Again</NavLink></button>
  //       </div>
  //     </div>
  //   );
  // }
  renderScores = () => {
    if (this.props.game) {
      const scores = this.props.game.questions[1].answers[1].score.map((score) => {
        return (
          <div key={this.props.game.questions[1]}>{this.props.game.questions[1].answers[1].score}</div>
        );
      });
      return scores;
    }
    return '';
  }

  render() {
    return (
      <div className="desktop-score-page">
        {/* {this.renderScores()}; */}
        {/* <div className="game-winner">
        //    <h1>{this.props.player.find(1)} won because ghouls
        //                 just want to have fun!
        //   </h1>
        //   <h1>Player 1 won because ghouls just want to have fun!</h1> */}
        <div className="game-winner-Wrapper">
          <div className="game-winner">
            <h1>Player 1 won because ghouls
                        just want to have fun!
            </h1>
          </div>
        </div>
        <div className="full-rank">
          <div className="final-rankings">
            <h3>1</h3>
            {/* <h3>{this.props.player.find(1)}</h3>
            <h3>{this.props.player.find(1).score}</h3> */}
            <h3>Player 1</h3>
            <h3>100</h3>
          </div>
          <div className="final-rankings">
            <h3>2</h3>
            {/* <h3>{this.props.player.find(2)}</h3>
            <h3>{this.props.player.find(2).score}</h3>
            <h3>Player 1</h3> */}
            <h3>Player 2</h3>
            <h3>100</h3>
          </div>
          <div className="final-rankings">
            <h3>3</h3>
            {/* <h3>{this.props.player.find(3)}</h3>
            <h3>{this.props.player.find(3).score}</h3>
            <h3>Player 1</h3> */}
            <h3>Player 3</h3>
            <h3>100</h3>
          </div>
          <div className="final-rankings">
            <h3>4</h3>
            {/* <h3>{this.props.player.find(4)}</h3>
            <h3>{this.props.player.find(4).score}</h3>
            <h3>Player 1</h3> */}
            <h3>Player 4</h3>
            <h3>100</h3>
          </div>
        </div>
        <div className="playagain-button">
          <button onClick={this.onRestartGame} type="submit" id="restart-game-button"><NavLink to="/desktop">Play Again</NavLink></button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    game: reduxState.socket.game,
  };
}

const DesktopScoreWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <DesktopScore {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default withRouter(connect(mapStateToProps, { fetchGame })(DesktopScoreWithSocket));
