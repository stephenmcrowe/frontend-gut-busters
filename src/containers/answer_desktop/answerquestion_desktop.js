import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './answer_desktop.scss';
import SocketContext from '../../socket-context';
import { fetchGame } from '../../actions/index';
import { startVoting } from '../../actions/submitActions';

/* function mapStateToProps(reduxState) {
  // console.log(reduxState);
  return {
    round: reduxState.game.round,
  };
}
*/

class QuestionAnswer extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.props.socket.on('gotcha', () => {
      console.log('dun got got!!!!');
    });

    // Bindings
    this.onStartVoting = this.onStartVoting.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  componentDidMount() {
    this.props.fetchGame(this.props.socket);
  }

  onButtonClick = () => {
    console.log(this.props.game);
  }

  onStartVoting() {
    console.log('clicked start voting!');
    // console.log(this.props.socket);
    startVoting(this.props.socket);
    // if (this.props.game) {
    //   startGame(this.props.socket, this.props.game.id);
    // }
  }

  renderQuestions = () => {
    if (this.props.game) {
      const questions = this.props.game.questions.map((question) => {
        return (
          <div key={question}>{question.bank.question}</div>
        );
      });
      return questions;
    }
    return '';
  }

  renderButton() {
    // did assuming whole background image/title/logo is just one image other than the button
    return (
    // <div id="start_round_button">
      <button onClick={this.onStartVoting} type="submit" id="start_round_button"><h3>Start Voting!</h3></button>
    // </div>

    );
  }

  // props.round will be instantiated once connected to backend
  // {this.props.round}
  render() {
    return (
      <div id="question_page">
        <h1>Ready?</h1>
        <h2>Quick! Answer the questions on your phone. When time runs out, go ahead and click to start voting on the funniest responses.</h2>
        <div id="dots">
          <div id="dot_1">.</div>
          <div id="dot_2">.</div>
          <div id="dot_3">.</div>
        </div>
        {this.renderButton()}
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


export default withRouter(connect(mapStateToProps, { fetchGame })(QuestionAnswerWithSocket));
