/* eslint-disable react/no-unused-state */
/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { submitVote } from '../../actions';
import './vote_mobile.scss';

// Required Props:
// player question

class mobileVote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tempAnswer: '',
    };
    // bindings
  }

  // functions
  selectAnswer(event) {
    this.setState({ tempAnswer: event.target.value });
  }

  submitAnswer(event) {
    event.preventDefault();
    this.props.submitAnswer(this.props.history);
  }

  render() {
    return (
      <div className="vote-page">
        <div className="header">
          <div className="timer">12</div>
        </div>
        <div className="vote-content">

          <div className="question-wrapper">
            <h1>What do you call an apple with no eyes?</h1>
            {/* <h1>{this.props.player.question}</h1> */}
          </div>

          <div className="options-wrapper">
            <button value="1" onClick={this.selectAnswer} className="select-vote first"><p>A hairy pear</p></button>
            {/* in the future, value should be :answerid */}
            {/* <input className="type-answer" type="text" placeholder="Your answer here..." onChange={this.answerTextChange} value={this.state.answerText} /> */}
            <button value="2" onClick={this.selectAnswer} className="select-vote second"><p>Phil Hanlon&apos;s left shoelace</p></button>
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


export default withRouter(connect(mapStateToProps, { submitVote })(mobileVote));
