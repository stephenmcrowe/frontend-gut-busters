/* eslint-disable react/button-has-type */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './score_mobile.scss';
import ghost from '../../img/ghost-score.png'; // img source https://www.freeiconspng.com/img/36315

// Data Needed (receive):
// props.player array with each player having player.score

// Build ranking logic function here

// this can be dumb or smart component
const mobileScore = (props) => {
  return (
    <div className="score-page">
      <img src={ghost} alt="Ghost Icon" />
      <div>
        <div className="final-score">
          <h2>Final Score</h2>
          <h3>104</h3>
          {/* props.player.score */}
        </div>
        <div className="rank">
          <h2>Rank</h2>
          <h3>2</h3>
          {/* put ranking logic function here */}
        </div>
      </div>
    </div>

  );
};

// connects particular parts of redux state to this components props
const mapStateToProps = state => (
  {
    player: state.player,
  }
);

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(mapStateToProps, null)(mobileScore));
