/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/*
* Sources:
* - Setting up timers: https://medium.com/dailyjs/combining-react-with-socket-io-for-real-time-goodness-d26168429a34
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { submitAnswer, moveOnEvent } from '../../actions/submitActions';
import './answer_mobile.scss';
import SocketContext from '../../socket-context';

class MobileAnswer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timestamp: '0',
      answerText1: '',
      answerText2: '',
      questionId1: '',
      questionId2: '',
      answerId1: '',
      answerId2: '',
      q1: null,
      q2: null,
    };

    // bindings
    this.answerTextChange1 = this.answerTextChange1.bind(this);
    this.answerTextChange2 = this.answerTextChange2.bind(this);
  }

  componentDidMount = () => {
    // Figure out which questions to display
    const myQuestions = [];
    const myAnswers = [];
    this.props.game.questions.forEach((question) => {
      question.answers.forEach((answer) => {
        if (answer.player === localStorage.getItem('myId')) {
          myQuestions.push(question);
          myAnswers.push(answer);
        }
      });
    });

    // Then set state locally using myQuestions
    this.setState({ questionId1: myQuestions[0].id });
    this.setState({ questionId2: myQuestions[1].id });
    this.setState({ answerId1: myAnswers[0].id });
    this.setState({ answerId2: myAnswers[1].id });
    this.setState({ q1: myQuestions[0] });
    this.setState({ q2: myQuestions[1] });

    this.props.socket.on('time_remaining', (timeLeft) => {
      this.setState({ timestamp: timeLeft });
    });

    const submitArgs = [
      this.props.socket,
      this.props.game.id,
      this.state.questionId1,
      this.state.answerId1,
      this.state.answerText1,
      this.state.questionId2,
      this.state.answerId2,
      this.state.answerText2,
    ];
    moveOnEvent(this.props.socket, this.props.history, 'time_out', '/mobile/waiting', this.submitAnswers, submitArgs);
  };

  componentWillUnmount = () => {
    this.props.socket.off('time_remaining');
    this.props.socket.off('time_out');
  }

  submitAnswers = (socket, gameId, questionId1, answerId1, answerText1, questionId2, answerId2, answerText2) => {
    submitAnswer(socket, gameId, questionId1, answerId1, answerText1);
    submitAnswer(socket, gameId, questionId2, answerId2, answerText2);
  }

  // functions
  answerTextChange1(event) {
    event.preventDefault();
    this.setState({ answerText1: event.target.value });
  }

  answerTextChange2(event) {
    event.preventDefault();
    this.setState({ answerText2: event.target.value });
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
        </div>
      </div>
    );
  }
}

// connects particular parts of redux state to this components props
function mapStateToProps(reduxState) {
  return {
    game: reduxState.socket.game,
  };
}

const MobileAnswerWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <MobileAnswer {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default withRouter(connect(mapStateToProps)(MobileAnswerWithSocket));
