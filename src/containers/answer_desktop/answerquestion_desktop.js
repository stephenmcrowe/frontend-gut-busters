import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './answer_desktop.scss';
import SocketContext from '../../socket-context';
import { moveOnEvent } from '../../actions/submitActions';

class QuestionAnswer extends Component {
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
  }

  componentWillUnmount = () => {
    this.props.socket.off('time_out');
    this.props.socket.off('time_remaining');
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
      <div id="question_page">
        {this.renderTimer()}
        <h1>Quick!</h1>
        <h2>Answer the questions on your phone. When time runs out, start voting on the funniest responses.</h2>
        <div id="dots">
          <div id="dot_1">.</div>
          <div id="dot_2">.</div>
          <div id="dot_3">.</div>
        </div>
      </div>

    );
  }
}

const QuestionAnswerWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <QuestionAnswer {...props} socket={socket} />}
  </SocketContext.Consumer>
);

function mapStateToProps(reduxState) {
  return {
    game: reduxState.socket.game,
  };
}

export default withRouter(connect(mapStateToProps, null)(QuestionAnswerWithSocket));
