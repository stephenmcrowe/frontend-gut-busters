import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { fetchGame } from '../../actions/index';
import { createGame } from '../../actions/submitActions';
import './score_desktop.scss';
import SocketContext from '../../socket-context';

/*
const game = {
  questions:
  [{
    _id: '5cf4ac5911eaf57ecc52a5a4',
    answers:
       [{
         votes: ['5cf4ac5911eaf57ecc52a5a3'],
         _id: '5cf4ac5911eaf57ecc52a5a5',
         player: '5cf4ac37405a507ea00abadc',
         score: 2,
       },
       {
         votes: [],
         _id: '5cf4ac5911eaf57ecc52a5a6',
         player: '5cf4ac5911eaf57ecc52a5a3',
         score: 1,
       }],
    bank:
       {
         _id: '5ce314df8fe1694fbe5f8241',
         question: 'this is a question?',
         __v: 0,
       },
    __v: 0,
  },
  {
    _id: '5cf4ac5911eaf57ecc52a5a7',
    answers:
       [{
         votes: [],
         _id: '5cf4ac5911eaf57ecc52a5a8',
         player: '5cf4ac5911eaf57ecc52a5a3',
         score: 7,
       },
       {
         votes: [],
         _id: '5cf4ac5911eaf57ecc52a5a9',
         player: '5cf4ac37405a507ea00abadc',
         score: 3,
       }],
    bank:
       {
         _id: '5cee52ade9f4ab41fa95739f',
         question: 'Something you should never stuff a bra with',
       },
    __v: 0,
  }],
  players:
  [{ _id: '5cf4ac37405a507ea00abadc', name: 'Stephen', __v: 0 },
    { _id: '5cf4ac5911eaf57ecc52a5a3', name: 'Madison', __v: 0 },
    { _id: '5cf4ac5911eaf57ecc52a5e4', name: 'Madeline', __v: 0 }],
  banks:
  [{
    _id: '5ce314df8fe1694fbe5f8241',
    question: 'this is a question?',
    __v: 0,
  },
  {
    _id: '5cee52ade9f4ab41fa95739f',
    question: 'Something you should never stuff a bra with',
  }],
  _id: '5cf4ac29405a507ea00abadb',
  code: '5432',
  stage: 'answer',
  active: true,
  __v: 0,
};
*/


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

  calcScores = () => {
    if (this.props.game) {
      const scores = this.props.game.players.reduce((map, curr) => {
      // eslint-disable-next-line no-param-reassign
        map[curr._id] = { score: 0, name: curr.name };
        return map;
      }, {});

      this.props.game.questions.forEach((question) => {
        let voteCount = 0;
        const playerVotes = {};
        question.answers.forEach((answer) => {
          voteCount += answer.score;
          playerVotes[answer.player] = answer.score;
        });
        if (voteCount) {
          Object.keys(playerVotes).forEach((playerId) => {
            scores[playerId].score += Math.round(playerVotes[playerId] / voteCount * 100);
          });
        }
      });

      // https://stackoverflow.com/questions/25500316/sort-a-dictionary-by-value-in-javascript
      const sortedScores = Object.keys(scores).map((key) => {
        return [key, scores[key]];
      });
      // Sort the array based on the second element
      sortedScores.sort((first, second) => {
        return second[1].score - first[1].score;
      });

      const finalScores = {};
      let rank = 1;
      let previous = sortedScores[0][1].score;
      sortedScores.forEach((item, idx) => {
        if (previous !== item[1].score) {
          rank += 1;
        }
        previous = item[1].score;
        finalScores[item[0]] = {
          score: item[1].score,
          name: item[1].name,
          rank,
        };
      });
      return finalScores;
    } else {
      return {};
    }
  }

  renderScores = () => {
    const scoresDict = this.calcScores();
    const scoresHtml = Object.keys(scoresDict).map((key) => {
      return (
        <div key={key} className="final-rankings">
          <h3>{scoresDict[key].rank}</h3>
          <h3>{scoresDict[key].name}</h3>
          <h3>{scoresDict[key].score}</h3>
        </div>
      );
    });
    return scoresHtml;
  }

  renderWinner = () => {
    const scoresDict = this.calcScores();
    const winners = [];
    Object.keys(scoresDict).forEach((key) => {
      if (scoresDict[key].rank === 1) {
        winners.push(scoresDict[key].name);
      }
    });
    let winDialogue = '';
    if (winners.length === 1) {
      winDialogue = `${winners[0]} won because ghouls just want to have fun!`;
    } else if (winners.length > 1) {
      winDialogue = `${winners.slice(0, winners.length - 1).join(', ')} and ${winners[winners.length - 1]} are tied for first!`;
    } else {
      winDialogue = 'Error fetching data';
    }
    return (
      <div className="game-winner">
        <h1>{winDialogue}</h1>
      </div>
    );
  }

  render() {
    return (
      <div className="desktop-score-page">
        <div className="game-winner-Wrapper">
          {this.renderWinner()}
        </div>
        <div className="full-rank">
          {this.renderScores()}
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
