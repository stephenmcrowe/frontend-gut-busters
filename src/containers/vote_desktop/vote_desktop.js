import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './vote_desktop.scss';
import SocketContext from '../../socket-context';
// import { fetchGame } from '../../actions/index';
import { moveOnEvent } from '../../actions/submitActions';

class DesktopVoting extends Component {
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

    moveOnEvent(this.props.socket, this.props.history, 'time_out', '/desktop/voteresult', null, null);
    // moveOnEvent(this.props.socket, this.props.history, 'score', '/desktop/score', null, null);
  }

  componentWillUnmount() {
    this.props.socket.off('time_remaining');
    this.props.socket.off('time_out');
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

  renderAnswers = () => {
    const answers = this.props.game.questions[this.props.index].answers.map((answer) => {
      return (
        <div key={answer.id} className="select-vote first answer-container">
          <div className="answer-box">
            <p>
              {answer.text}
            </p>
          </div>
        </div>
      );
    });
    return answers;
  }

  renderQuestion = () => {
    if (this.props.game && Number.isInteger(this.props.index)) {
      const question = this.props.game.questions[this.props.index];
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
      return (<div>Loading...</div>);
    }
  }

  // props.round will be instantiated once connected to backend
  render() {
    return (
      <div className="voting_page">
        {this.renderTimer()}
        {this.renderQuestion()}
        {/* <h1>Vote!
        </h1>
        <h2>Voting in Progress...</h2>
        <div id="dots">
          <div id="dot_1">.</div>
          <div id="dot_2">.</div>
          <div id="dot_3">.</div>
          <button onClick={this.test} type="button">Test</button>
        </div> */}
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

const DesktopVotingWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <DesktopVoting {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default withRouter(connect(mapStateToProps, null)(DesktopVotingWithSocket));
