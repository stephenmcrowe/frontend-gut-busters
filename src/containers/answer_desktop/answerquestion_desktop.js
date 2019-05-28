import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './answer_desktop.scss';

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
  // {this.props.round}
  render() {
    return (
      <div id="question_page">
        <h1>Round</h1>
        <h2>Please Answer Question on Screen</h2>
        <div id="dots">
          <div id="dot_1">.</div>
          <div id="dot_2">.</div>
          <div id="dot_3">.</div>
        </div>
      </div>

    );
  }
}


export default withRouter(connect(null, null)(questionAnswer));
