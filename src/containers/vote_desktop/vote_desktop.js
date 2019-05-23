import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


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
        <h1>Round</h1>
        {this.props.round}
        <h2>Voting in Progress...</h2>
      </div>

    );
  }
}


export default withRouter(connect(null, null)(voting));
