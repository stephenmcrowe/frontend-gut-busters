import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './vote_desktop.scss';

/* function mapStateToProps(reduxState) {
  // console.log(reduxState);
  return {
    round: reduxState.game.round,
  };
}
*/

class voting extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  // props.round will be instantiated once connected to backend
  render() {
    return (
      <div className="voting_page">
        <h1>Round
          {this.props.round}
        </h1>
        <h2>Voting in Progress...</h2>
        <div id="dots">
          <div id="dot_1">.</div>
          <div id="dot_2">.</div>
          <div id="dot_3">.</div>
        </div>
      </div>

    );
  }
}


export default withRouter(connect(null, null)(voting));
