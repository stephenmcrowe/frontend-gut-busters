import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SocketContext from '../../socket-context';
import { fetchGame } from '../../actions';

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
  }

  componentDidMount() {
    this.props.fetchGame(this.props.socket);
    console.log('game fetched in answer question');
  }

  // props.round will be instantiated once connected to backend
  render() {
    return (
      <div className="question_page">
        <h1>Round</h1>
        {this.props.round}
        <h2>Please Answer Question on Your Screen</h2>
      </div>

    );
  }
}

const QuestionAnswerWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <QuestionAnswer {...props} socket={socket} />}
  </SocketContext.Consumer>
);


export default withRouter(connect(null, { fetchGame })(QuestionAnswerWithSocket));
