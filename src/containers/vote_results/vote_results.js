/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './vote_results.scss';
import SocketContext from '../../socket-context';
// import { nextQuestion } from '../../actions';
import { moveOnEvent } from '../../actions/submitActions';

class VoteResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timestamp: '0',
    };
  }

  componentDidMount() {
    this.props.socket.on('time_remaining', (timeLeft) => {
      this.setState({ timestamp: timeLeft });
    });

    moveOnEvent(this.props.socket, this.props.history, 'vote', '/desktop/vote', null, null);
    moveOnEvent(this.props.socket, this.props.history, 'score', '/desktop/score', null, null);
  }

  componentWillUnmount() {
    this.props.socket.off('time_remaining');
    this.props.socket.off('vote');
    this.props.socket.off('score');
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

  renderHeader() {
    // did assuming whole background image/title/logo is just one image other than the button
    const question = this.props.game.questions[this.props.index];
    return (
      <div id="voteResults">
        <div id="question">
          <h1>
            {question.bank.question}
          </h1>
        </div>
        <div className="rainbow" />
      </div>
    );
  }

  renderAnswers = () => {
    const answers = this.props.game.questions[this.props.index].answers.map((answer) => {
      return (
        <div key={answer.id} className="answer-container">
          <div className="answer-box">
            <h3>
              {answer.text}
            </h3>
            <h3>
              {`Votes: ${answer.score}`}
            </h3>
          </div>
        </div>
      );
    });
    return answers;
  }

  render() {
    return (
      <div className="vote_results">
        {this.renderTimer()}
        {this.renderHeader()}
        {this.renderAnswers()}
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    game: reduxState.socket.game,
    index: reduxState.vote.index,
  };
}

const VoteResultsWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <VoteResults {...props} socket={socket} />}
  </SocketContext.Consumer>
);

// export default withRouter(connect(null, { nextQuestion })(voteResults));
export default withRouter(connect(mapStateToProps, null)(VoteResultsWithSocket));
