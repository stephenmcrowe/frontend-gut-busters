/* eslint-disable react/button-has-type */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './score_mobile.scss';
import ghost from '../../img/ghost-score.png'; // img source https://www.freeiconspng.com/img/36315
import SocketContext from '../../socket-context';

const MobileScore = (props) => {
  function calcScores() {
    const scores = props.game.players.reduce((map, curr) => {
      // eslint-disable-next-line no-param-reassign
      map[curr._id] = 0;
      return map;
    }, {});

    props.game.questions.forEach((question) => {
      let voteCount = 0;
      const playerVotes = {};
      question.answers.forEach((answer) => {
        voteCount += answer.score;
        playerVotes[answer.player] = answer.score;
      });
      if (voteCount) { // Else no votes cast
        Object.keys(playerVotes).forEach((playerId) => {
          scores[playerId] += Math.round(playerVotes[playerId] / voteCount * 100);
        });
      }
    });

    // https://stackoverflow.com/questions/25500316/sort-a-dictionary-by-value-in-javascript
    const sortedScores = Object.keys(scores).map((key) => {
      return [key, scores[key]];
    });
    // Sort the array based on the second element
    sortedScores.sort((first, second) => {
      return second[1] - first[1];
    });

    const finalScores = {};
    let rank = 1;
    let previous = sortedScores[0][1];
    sortedScores.forEach((item, idx) => {
      if (previous !== item[1]) {
        rank += 1;
      }
      [, previous] = item;
      finalScores[item[0]] = {
        score: item[1],
        rank,
      };
    });
    return finalScores;
  }

  function renderScore() {
    const scores = calcScores();
    return (
      <div className="score-text">
        <div className="final-score">
          <h1>{scores[localStorage.getItem('myId')].rank === 1 ? 'YOU WON!' : 'YOU LOST! Better luck next time...'}</h1>
          {/* Change as appropriate... for now, everyone is a winner */}
          <h2>Final Score</h2>
          <h3>{scores[localStorage.getItem('myId')].score}</h3>
        </div>
        <div className="rank">
          <h2>Rank</h2>
          <h3>{scores[localStorage.getItem('myId')].rank}</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="score-page">
      <img className="score-icon" src={ghost} alt="Ghost Icon" />
      {renderScore()}
    </div>
  );
};

// connects particular parts of redux state to this components props
function mapStateToProps(reduxState) {
  return {
    game: reduxState.socket.game,
  };
}

const MobileScoreWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <MobileScore {...props} socket={socket} />}
  </SocketContext.Consumer>
);

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(mapStateToProps, null)(MobileScoreWithSocket));
