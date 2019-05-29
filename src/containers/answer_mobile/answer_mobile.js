/* eslint-disable react/button-has-type */
/*
* Sources:
* - Setting up timers: https://medium.com/dailyjs/combining-react-with-socket-io-for-real-time-goodness-d26168429a34
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { fetchGame } from '../../actions/index';
import { submitAnswer, pushStage, moveOn } from '../../actions/submitActions';
import './answer_mobile.scss';
import SocketContext from '../../socket-context';
import { subscribeToTimer } from '../../timers';


// Required Props:
// player question

class MobileAnswer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answerText: '',
      timestamp: '10',
      questionId: '',
      answerId: '',
    };

    // Received Events
    this.props.socket.on('time_remaining', (time) => {
      console.log(`timer reads: ${time}`);
    });
    this.props.socket.on('time_out', () => {
      console.log('Time out!');
      submitAnswer(this.props.socket, this.props.game._id, this.state.questionId, this.state.answerId, '');
      moveOn(this.props.socket, this.props.history, 'mobile/waiting');
    });

    this.props.socket.on('timer', () => {
      console.log('received timer!');
    });

    subscribeToTimer(this.props.socket, (err, timeRemaining) => this.setState({
      timestamp: timeRemaining,
    }));


    // bindings
    this.answerTextChange = this.answerTextChange.bind(this);
    this.submitTypedAnswer = this.submitTypedAnswer.bind(this);
  }

  componentDidMount = () => {
    fetchGame(this.props.socket);
    // update questionId and answerId state fields here
  }


  // functions
  answerTextChange(event) {
    this.setState({ answerText: event.target.value });
  }

  submitTypedAnswer(event) {
    // event.preventDefault();
    this.props.submitAnswer(this.props.socket, this.props.game._id, this.state.questionId, this.state.answerId, this.state.answerText);
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


  render() {
    return (
      <div className="answer-page">
        <div className="header">
          <div className="timer">
            {this.state.timestamp}
          </div>
        </div>
        <div className="answer-content">

          <div className="question-wrapper">
            <h1>What do you call an apple with no eyes?</h1>
            {/* <h1>{this.props.question}</h1> */}
          </div>

          <div className="answer-wrapper">
            <input className="type-answer" type="text" placeholder="Your answer here..." onChange={this.answerTextChange} value={this.state.answerText} />
          </div>
          <div className="submit-button">
            <button onClick={this.submitAnswer} className="join-game-button"><NavLink to="/mobile/waiting" className="join-game"><p>Done!</p></NavLink></button>
          </div>
        </div>

      </div>
    );
  }
}

// connects particular parts of redux state to this components props
const mapStateToProps = state => (
  {
    question: state.question,
    game: state.game,
  }
);


const MobileAnswerWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <MobileAnswer {...props} socket={socket} />}
  </SocketContext.Consumer>
);


export default withRouter(connect(mapStateToProps, { submitAnswer, fetchGame })(MobileAnswerWithSocket));
