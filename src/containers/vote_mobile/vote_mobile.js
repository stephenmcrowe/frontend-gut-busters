/* eslint-disable react/no-unused-state */
/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import SocketContext from '../../socket-context';
import { fetchGame, currentVote } from '../../actions/index';
import { submitVote, receiveVote, moveOn } from '../../actions/submitActions';
import './vote_mobile.scss';
import ghost from '../../img/ghost-score.png';

// Required Props:
// player question

class MobileVote extends Component {
  constructor(props) {
    super(props);

    const myIdx = receiveVote(this.props.socket);

    this.state = {
      tempAnswer: '',
      timestamp: '15',
      idx: myIdx,
      display: true,
    };

    // Listeners
    this.props.socket.on('vote', (id) => {
      console.log('received vote event');
      console.log(id);
      currentVote(id);
      // moveOn(this.props.socket, this.props.history, (`mobile/vote/${id}`));
    });

    // this.props.socket.on('vote', (id) => {
    //   moveOn(this.props.socket, this.props.history, (`mobile/vote/${id}`));
    // });

    this.props.socket.on('see_scores', () => {
      moveOn(this.props.socket, this.props.history, 'mobile/score');
    });

    // Bindings
    this.voteTiming = this.voteTiming.bind(this);
  }

  componentDidMount = () => {
    fetchGame(this.props.socket);
    this.voteTiming();
  }

  // functions
  selectAnswer(event) {
    this.setState({ tempAnswer: event.target.value });
  }

  submitVote(event) {
    event.preventDefault();

    // make sure this exact path is set up later because right now it's not the player id who answered the question
    if (this.props.game.questions[this.idx].answers.playerid === localStorage.getItem('myId')) {
      this.setState({ display: false });
    }
    // eslint-disable-next-line max-len
    submitVote(this.props.socket, this.props.game.id, this.props.game.questions[this.idx], this.props.game.questions[this.idx].answer.id, this.props.game.questions[this.idx].answers.playerid);
  }

  voteTiming() {
  // Emit time updates to client
    let timeLeft = 14;
    const voteTimerCountdown = setInterval(() => {
      this.setState({
        timestamp: timeLeft,
      });
      // eslint-disable-next-line no-plusplus
      timeLeft--;
      if (timeLeft === 0) {
        this.setState({
          timestamp: 0,
        });
        clearInterval(voteTimerCountdown);
      }
    }, 1000);
  }

  render() {
    if (this.state.display) {
      return (
        <div className="vote-page">
          <div className="header">
            <div className="timer">
              {this.state.timestamp}
            </div>
          </div>
          <div className="vote-content">
            <div className="question-wrapper">
              <h1>What do you call an apple with no eyes?</h1>
              {/* <h1>{this.props.game.questions[this.idx].bank.question}</h1> */}
            </div>

            <div className="options-wrapper">
              <button value="1" onClick={this.selectAnswer} className="select-vote first"><p>opt 1{/* this.props.game.questions[this.idx].answers[0] */}</p></button>
              {/* in the future, value should be :answerid */}
              {/* <input className="type-answer" type="text" placeholder="Your answer here..." onChange={this.answerTextChange} value={this.state.answerText} /> */}
              <button value="2" onClick={this.selectAnswer} className="select-vote second"><p>opt 2{/* this.props.game.questions[this.idx].answers[1] */}</p></button>
            </div>
            <div className="submit-button">
              <button onClick={this.submitAnswer} className="join-game-button"><NavLink to="/mobile/waiting" className="join-game"><p>Done!</p></NavLink></button>
            </div>
          </div>

        </div>
      );
    } else {
      return (
        <div id="mobile-waiting-page">
          <div id="waiting-joke">
            {/* <h1>{this.selectedJoke}</h1> */}
            {/* figure out how to loop through the jokes here that are
              specifically ghost related */}
            <h1>If you&apos;ve got it... Haunt it!</h1>
          </div>
          <div id="waiting-loading">
            <img className="loading-icon" src={ghost} alt="Loading Icon" />
            {/* <div className="base-loading" /> */}
            {/* loading image that moves do it with CSS */}
          </div>
          <div id="waiting-info">
            <h2>
              {/* TODO: argument based on which component is next */}
              Waiting information: here is what you need to know!
            </h2>
          </div>
        </div>
      );
    }
  }
}

// connects particular parts of redux state to this components props
function mapStateToProps(reduxState) {
  return {
    game: reduxState.socket.game,
  };
}

const MobileVoteWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <MobileVote {...props} socket={socket} />}
  </SocketContext.Consumer>
);


export default withRouter(connect(mapStateToProps, { fetchGame, currentVote })(MobileVoteWithSocket));
