/* eslint-disable react/button-has-type */
/*
* Sources:
* - Setting up timers: https://medium.com/dailyjs/combining-react-with-socket-io-for-real-time-goodness-d26168429a34
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { fetchGame } from '../../actions/index';
import { submitAnswer, moveOn } from '../../actions/submitActions';
import './answer_mobile.scss';
import SocketContext from '../../socket-context';
import { subscribeToTimer } from '../../timers';


// Required Props:
// player question

class MobileAnswer extends Component {
  constructor(props) {
    super(props);


    this.state = {
      answerText1: '',
      answerText2: '',
      timestamp: '30',
      questionId1: '', // this.props.question[0].id, // this.props.question[quesIndex1].id,
      questionId2: '', // this.props.question[1].id, // this.props.question[quesIndex2].id,
      answerId1: '', // this.props.question[0].answers[0].id, // this.props.question[quesIndex1].answers[answerIndex1].id,
      answerId2: '', // this.props.question[1].answers[0].id, // this.props.question[quesIndex2].[answerIndex1].id,
      q1: '',
      q2: '',
    };

    // Received Events
    this.props.socket.on('time_remaining', (time) => {
      // console.log(`timer reads: ${time}`);
    });

    this.props.socket.on('time_out', () => {
      console.log('Time out!');
      // console.log(this.props.question[0].answers[0].id, this.props.question[1].answers[0].id);
      // console.log(this.props.game);
      console.log(this.props.game);
      console.log(`questionId1: ${this.state.questionId1}`);
      console.log(`answerId1: ${this.state.answerId1}`);
      console.log(`answerText1: ${this.state.answerText1}`);
      console.log(`questionId2: ${this.state.questionId2}`);
      console.log(`answerId2: ${this.state.answerId2}`);
      console.log(`answerText2: ${this.state.answerText2}`);
      submitAnswer(this.props.socket, this.props.game.id, this.state.questionId1, this.state.answerId1, this.state.answerText1);
      submitAnswer(this.props.socket, this.props.game.id, this.state.questionId2, this.state.answerId2, this.state.answerText2);
      moveOn(this.props.socket, this.props.history, 'mobile/waiting');
    });


    this.props.socket.on('timer', () => {
      console.log('received timer!');
    });

    subscribeToTimer(this.props.socket, (err, timeRemaining) => this.setState({
      timestamp: timeRemaining,
    }));


    // bindings
    this.answerTextChange1 = this.answerTextChange1.bind(this);
    this.answerTextChange2 = this.answerTextChange2.bind(this);
    // this.setIds = this.setIds.bind(this);
    this.submitTypedAnswers = this.submitTypedAnswers.bind(this);
  }


  componentDidMount = () => {
    fetchGame(this.props.socket);

    // Super jankey but we need to rerender with event
    this.props.socket.on('game', (game) => {
      const myQuestions = [];
      const myAnswers = [];
      game.questions.forEach((question) => {
        question.answers.forEach((answer) => {
          if (answer.player === localStorage.getItem('myId')) {
            myQuestions.push(question);
            myAnswers.push(answer);
          }
        });
      });
      console.log(`myQuestions${myQuestions}`);

      // Then set state locally using myQuestions
      this.setState({ questionId1: myQuestions[0].id });
      this.setState({ questionId2: myQuestions[1].id });
      this.setState({ answerId1: myAnswers[0].id });
      this.setState({ answerId2: myAnswers[1].id });
      this.setState({ q1: myQuestions[0] });
      this.setState({ q2: myQuestions[1] });
    });
  };

  // functions
  answerTextChange1(event) {
    event.preventDefault();
    this.setState({ answerText1: event.target.value });
  }

  answerTextChange2(event) {
    event.preventDefault();
    this.setState({ answerText2: event.target.value });
  }

  submitTypedAnswers(event) {
    event.preventDefault();
    this.props.submitAnswer(this.props.socket, this.props.game.id, this.state.questionId1, this.state.answerId1, this.state.answerText1);
    this.props.submitAnswer(this.props.socket, this.props.game.id, this.state.questionId2, this.state.answerId2, this.state.answerText2);

    // this.props.socket.emit('start_voting'); // wrong place to do this
    moveOn(this.props.socket, this.props.history, 'mobile/waiting');
    // pushStage(this.props.socket, this.props.history);
  }

  // Emitted Events
  subscribeMe(cb) {
    // this.props.socket.emit('subscribe_to_timer');
    subscribeToTimer(this.props.socket, cb);
  }

  // Miscellaneous testing
  // eslint-disable-next-line class-methods-use-this
  display(err, timestamp) {
    console.log(`current time reads ${timestamp}`);
  }

  renderQuestion1() {
    if (this.props.game && this.state.q1) {
      return this.state.q1.bank.question;
    }
    return '';
  }

  renderQuestion2() {
    if (this.props.game && this.state.q2) {
      return this.state.q2.bank.question;
    }
    return '';
  }


  render() {
    return (
      <div className="answer-page">
        <div className="header">
          <div className="timer">
            {this.state.timestamp}
          </div>
        </div>
        <div className="answer-content">

          <div className="qst-1">
            <div className="question-wrapper">
              {/* <h1>What do you call an apple with no eyes?</h1> */}
              <h1>{this.renderQuestion1()}</h1>
            </div>

            <div className="answer-wrapper">
              <input className="type-answer" type="text" placeholder="Your answer here..." onChange={this.answerTextChange1} value={this.state.answerText1} />
            </div>
          </div>

          <div className="qst-2">
            <div className="question-wrapper">
              {/* <h1>Best history prof rap name:</h1> */}
              <h1>{this.renderQuestion2()}</h1>
            </div>

            <div className="answer-wrapper">
              <input className="type-answer" type="text" placeholder="Your answer here..." onChange={this.answerTextChange2} value={this.state.answerText2} />
            </div>
          </div>

          <div className="submit-button">
            <button onClick={this.submitTypedAnswers} className="join-game-button"><NavLink to="/mobile/waiting" className="join-game"><p>Done!</p></NavLink></button>
          </div>
        </div>
      </div>
    );
  }
}

// connects particular parts of redux state to this components props
function mapStateToProps(reduxState) {
  return {
    question: reduxState.socket.game.questions,
    game: reduxState.socket.game,

  };
}

const MobileAnswerWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <MobileAnswer {...props} socket={socket} />}
  </SocketContext.Consumer>
);


export default withRouter(connect(mapStateToProps, { fetchGame })(MobileAnswerWithSocket));
