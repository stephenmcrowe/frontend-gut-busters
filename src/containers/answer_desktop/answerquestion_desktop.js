import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SocketContext from '../../socket-context';

/* function mapStateToProps(reduxState) {
  // console.log(reduxState);
  return {
    round: reduxState.game.round,
  };
}
*/

class questionAnswer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
    {socket => <questionAnswer {...props} socket={socket} />}
  </SocketContext.Consumer>
);


export default withRouter(connect(null, null)(QuestionAnswerWithSocket));
