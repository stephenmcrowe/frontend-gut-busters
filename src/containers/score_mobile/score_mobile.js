/* eslint-disable react/button-has-type */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './score_mobile.scss';
import ghost from '../../img/ghost-score.png'; // img source https://www.freeiconspng.com/img/36315
import SocketContext from '../../socket-context';

// Data Needed (receive):
// props.player array with each player having player.score

// Build ranking logic function here

// this can be dumb or smart component
// class MobileScore extends Component {
//   constructor(props) {
//     super(props);
//   }

const MobileScore = (props) => {
  function calcScores() {
    const scores = props.game.players.reduce((map, curr) => {
      // eslint-disable-next-line no-param-reassign
      map[curr._id] = 0;
      return map;
    }, {});

    props.game.questions.forEach((question) => {
      question.answers.forEach((answer) => {
        scores[answer.player] += answer.score;
      });
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
    sortedScores.forEach((item, idx) => {
      finalScores[item[0]] = {
        score: item[1],
        rank: idx + 1,
      };
    });

    console.log(finalScores);
    return finalScores;
  }

  function renderScore() {
    const scores = calcScores();
    return (
      <div className="score-text">
        <div className="final-score">
          <h1>YOU WON!</h1>
          {/* Change as appropriate... for now, everyone is a winner */}
          <h2>Final Score</h2>
          <h3>{scores[localStorage.getItem('myId')].score * 100}</h3>
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
