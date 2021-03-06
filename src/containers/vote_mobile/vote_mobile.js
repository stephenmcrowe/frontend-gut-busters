/* eslint-disable react/no-unused-state */
/* eslint-disable react/button-has-type */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SocketContext from '../../socket-context';
import { submitVote, moveOnEvent } from '../../actions/submitActions';
import './vote_mobile.scss';

class MobileVote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timestamp: '0',
    };
  }

  componentDidMount = () => {
    this.props.socket.on('time_remaining', (timeLeft) => {
      this.setState({ timestamp: timeLeft });
    });

    moveOnEvent(this.props.socket, this.props.history, 'time_out', '/mobile/waiting', null, null);
  }

  componentWillUnmount = () => {
    this.props.socket.off('time_out');
    this.props.socket.off('time_remaining');
  }

  selectVote = (event) => {
    submitVote(this.props.socket, this.props.game.id, this.props.game.questions[this.props.index],
      event.currentTarget.value, localStorage.getItem('myId'));
    this.props.history.push('/mobile/waiting');
  }

  renderAnswers = () => {
    const answers = this.props.game.questions[this.props.index].answers.map((answer) => {
      return (
        <button key={answer.id} value={answer.id} onClick={this.selectVote} className="select-vote first">
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
      let display = true;
      question.answers.forEach((answer) => {
        if (answer.player === localStorage.getItem('myId')) {
          display = false;
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
          </div>
        );
      } else {
      // Your question
        return (<div id="vote-content"><h1>Hold tight! You can&apos;t vote on your own question, silly.</h1></div>);
      }
    } else {
      return (<div>Loading...</div>);
    }
  }

  renderTimer = () => {
    return (
      <div className="header">
        <div className="timer">
          {this.state.timestamp}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="vote-page">
        {this.renderTimer()}
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
