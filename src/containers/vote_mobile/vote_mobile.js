/* eslint-disable react/no-unused-state */
/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import SocketContext from '../../socket-context';
// import { fetchGame, currentVote } from '../../actions/index';
import { moveOn } from '../../actions/submitActions';
import './vote_mobile.scss';
// import ghost from '../../img/ghost-score.png';
import { subscribeToTimer } from '../../timers';

// Required Props:
// player question

class MobileVote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timestamp: '0',
      tempAnswer: null,
      display: true,
    };

    subscribeToTimer(this.props.socket, (err, timeRemaining) => this.setState({
      timestamp: timeRemaining,
    }));

    console.log(this.props.game);

    this.props.socket.on('time_out', (vote) => {
      console.log('time out');
      // record vote
      moveOn(this.props.socket, this.props.history, 'mobile/waiting');
    });
  }

  componentDidMount = () => {
    // calculate if this is the players answer
    if (this.props.game && Number.isInteger(this.props.index)) {
      const question = this.props.game.questions[this.props.index];
      console.log(question);

      question.answers.forEach((answer) => {
        if (answer.player === localStorage.getItem('myId')) {
          this.setState({ display: false });
        }
      });
    }
  }

  // functions
  selectAnswer = (event) => {
    this.setState({ tempAnswer: event.target.value });
  }

  // submitVote(event) {
  //   event.preventDefault();
  //
  //   // make sure this exact path is set up later because right now it's not the player id who answered the question
  //   if (this.props.game.questions[this.idx].answers.playerid === localStorage.getItem('myId')) {
  //     this.setState({ display: false });
  //   }
  //   // eslint-disable-next-line max-len
  //   submitVote(this.props.socket, this.props.game.id, this.props.game.questions[this.state.idx],
  //   this.props.game.questions[this.state.idx].answer.id, this.props.game.questions[this.idx].answers.playerid);
  // }

  renderAnswers = () => {
    const answers = this.props.game.questions[this.props.index].answers.map((answer) => {
      return (
        <button key={answer.id} value={answer.id} onClick={this.selectAnswer} className="select-vote first">
          <p>
            {answer.text}
          </p>
        </button>
      );
    });
    return answers;
  }

  renderQuestion = () => {
    if (this.props.game && Number.isInteger(this.props.index)) {
      const question = this.props.game.questions[this.props.index];
      let display = false;
      question.answers.forEach((answer) => {
        if (answer.player === localStorage.getItem('myId')) {
          display = true;
        }
      });
      if (display) {
        return (
          <div className="vote-content">
            <div className="question-wrapper">
              <h1>{question.bank.question}</h1>
            </div>

            <div className="options-wrapper">
              {this.renderAnswers()}
            </div>
            <div className="submit-button">
              <button onClick={this.submitAnswer} className="join-game-button"><NavLink to="/mobile/waiting" className="join-game"><p>Done!</p></NavLink></button>
            </div>
          </div>
        );
      } else {
      // Your question
        return (<div>THIS IS YOUR QUESTION </div>);
      }
    } else {
      return (<div>Loading...</div>);
    }
  }

  render() {
    return (
      <div className="vote-page">
        <div className="header">
          <div className="timer">
            {this.state.timestamp}
          </div>
        </div>
        {this.renderQuestion()}
      </div>
    );
  }
}

// connects particular parts of redux state to this components props
function mapStateToProps(reduxState) {
  return {
    game: reduxState.socket.game,
    index: reduxState.vote.index,
  };
}

const MobileVoteWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <MobileVote {...props} socket={socket} />}
  </SocketContext.Consumer>
);


export default withRouter(connect(mapStateToProps)(MobileVoteWithSocket));
