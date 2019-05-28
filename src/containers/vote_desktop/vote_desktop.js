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

class DesktopVoting extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.fetchGame(this.props.socket);
    console.log('game fetched in desktop voting');
  }

  // props.round will be instantiated once connected to backend
  render() {
    return (
      <div className="voting_page">
        <h1>Round
          {this.props.round}
        </h1>
        <h2>Voting in Progress...</h2>
      </div>

    );
  }
}

const DesktopVotingWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <DesktopVoting {...props} socket={socket} />}
  </SocketContext.Consumer>
);


export default withRouter(connect(null, { fetchGame })(DesktopVotingWithSocket));
