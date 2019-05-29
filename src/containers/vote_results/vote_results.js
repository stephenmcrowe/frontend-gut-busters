/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import './vote_results.scss';
import SocketContext from '../../socket-context';
// import { nextQuestion } from '../../actions';

/*
listens for players coming in
store player info as local state for now
Navlink to start round aka questions
*/

// need to figure out the new information flow of getting the questions in that round and the votes of each question to use

/* will get posts eventually
function mapStateToProps(reduxState) {
  // console.log(reduxState);
  return {
    room_id: reduxState.game.id,
    players: reduxState.game.players,
    votes: reduxState.game.votes,
    questions: reduxState.game.round.questions,
  };
}
*/

class VoteResults extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onNext = this.onNext.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderNextButton = this.renderNextButton.bind(this);
  }


  /* componentDidMount() {
    this.props.getQuestions();
    this.props.getVotes();
  }
  */

  onNext() {
    // event.preventDefault();
    this.props.nextResults(this.state);
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

const VoteResultsWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <VoteResults {...props} socket={socket} />}
  </SocketContext.Consumer>
);

// export default withRouter(connect(null, { nextQuestion })(voteResults));
export default withRouter(connect(null, null)(VoteResultsWithSocket));