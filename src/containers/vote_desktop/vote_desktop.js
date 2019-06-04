import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './vote_desktop.scss';
import SocketContext from '../../socket-context';
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
  }

  componentWillUnmount() {
    this.props.socket.off('time_remaining');
    this.props.socket.off('time_out');
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
        <div key={answer.id} className="select-vote first">
          <p>
            {answer.text}
          </p>
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

  render() {
    return (
      <div className="voting_page">
        {this.renderTimer()}
        {this.renderQuestion()}
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
