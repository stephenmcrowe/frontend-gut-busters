/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
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
    return (
      <div id="voteResults">
        <div id="question">
          <h1>
            { this.props.question}
          What do you call a one eyed pear?
          </h1>
        </div>
        <div className="rainbow" />
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


  renderNextButton() {
    // did assuming whole background image/title/logo is just one image other than the button
    return (
    // would be to "/desktop/voteResult/:id once we get the questions ids per round and the votes
    // button will be image in css         <div className="next_button_pic" />
      <div id="next_button">
        <button onClick={this.onNext} type="submit" id="button"><NavLink to="/desktop/answer" /></button>
      </div>

    );
  }

  /*
  // did assuming whole background image/title/logo is just one image other than the button
    // need to comeback and make sure that the components name match with the model

    // leftout bc need map state to props working for this to iterate through answers
    <div className="player_answers" key={answer._id}>
          <img alt="player_img" />
          {this.answer.text}
          <!-- iterate through images of the players who botes for this__>
           <div className="answers_voters">
                <img alt="player:id_img" />
           </div>
        </div>
        */

  render() {
    // return (
    // this.props.players.map((answers) => {
    return (
      <div className="vote_results">
        {this.renderTimer()}
        {this.renderHeader()}
        <div className="player_answers">
          <div className="answer">
            <div className="answer_player_img" />
            <h1>Answer Text Here</h1>
            <div className="answers_voters">
              <div className="voter_player_img1" />
              <div className="voter_player_img2" />
            </div>
          </div>
        </div>
        {this.renderNextButton()}
      </div>

    );
    // })
    // );
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
