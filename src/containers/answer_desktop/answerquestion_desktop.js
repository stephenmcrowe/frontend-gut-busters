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


export default withRouter(connect(null, null)(questionAnswer));
