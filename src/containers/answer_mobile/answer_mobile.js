/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { submitAnswer } from '../../actions';
import './answer_mobile.scss';

// Required Props:
// player question

class mobileAnswer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answerText: '',
    };
    // bindings
  }

  // functions
  answerTextChange(event) {
    this.setState({ answerText: event.target.value });
  }

  submitAnswer(event) {
    event.preventDefault();
    this.props.submitAnswer(this.props.history);
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
            {/* <h1>{this.props.player.question}</h1> */}
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


export default withRouter(connect(mapStateToProps, { submitAnswer })(mobileAnswer));
