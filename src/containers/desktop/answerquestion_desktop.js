import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


function mapStateToProps(reduxState) {
  // console.log(reduxState);
  return {
    round: reduxState.game.round,
  };
}

const questionAnswer = (props) => {
  return (
    <div className="question_page">
      <h1>Round</h1>
      {props.round}
      <h2>Please Answer Question on Your Screen</h2>
    </div>

  );
};


export default withRouter(connect(mapStateToProps, null)(questionAnswer));
