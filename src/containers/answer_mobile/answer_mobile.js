/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { fetchGame } from '../../actions/index';
import { submitAnswer, pushStage } from '../../actions/submitActions';
import './answer_mobile.scss';
import SocketContext from '../../socket-context';

// Required Props:
// player question

class MobileAnswer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answerText: '',
    };
    // bindings
    this.answerTextChange = this.answerTextChange.bind(this);
    this.submitAnswer = this.answerTextChange.bind(this);
  }

  componentDidMount = () => {
    fetchGame(this.props.socket);
  }


  // functions
  answerTextChange(event) {
    this.setState({ answerText: event.target.value });
  }

  submitAnswer(event) {
    // event.preventDefault();
    this.props.submitAnswer(this.props.history);
    pushStage(this.props.socket, this.props.history);
  }

  render() {
    return (
      <div className="answer-page">
        <div className="header">
          <div className="timer">12</div>
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
  }
);


const MobileAnswerWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <MobileAnswer {...props} socket={socket} />}
  </SocketContext.Consumer>
);


export default withRouter(connect(mapStateToProps, { submitAnswer, fetchGame })(MobileAnswerWithSocket));
