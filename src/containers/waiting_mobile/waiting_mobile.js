/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './waiting_mobile.scss';
import ghost from '../../img/ghost-score.png';
import SocketContext from '../../socket-context';
import { moveOnEvent } from '../../actions/submitActions';


const randomInt = require('random-int');

class MobileWaiting extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      selectedJoke: '',
    };
  }


  componentDidMount() {
    this._isMounted = true;

    axios.get('https://icanhazdadjoke.com/search?term=ghost', {
      headers: { Accept: 'application/json' },
    })
      .then((response) => {
        // save random joke to state
        const jokes = response.data.results.map(joke => ({
          jokeID: joke.id,
          jokeText: joke.joke,
        }));
        const random = randomInt(0, jokes.length - 1);

        if (this._isMounted) {
          this.setState({ selectedJoke: jokes[random].jokeText });
        }
      }).catch((error) => {
        console.log('did not load waiting joke');
        console.log(error);
      });
    moveOnEvent(this.props.socket, this.props.history, 'answer', '/mobile/answer', null, null);
    moveOnEvent(this.props.socket, this.props.history, 'vote', '/mobile/vote', null, null);
    moveOnEvent(this.props.socket, this.props.history, 'score', '/mobile/score', null, null);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div id="mobile-waiting-page">
        <div id="waiting-joke">
          <h1>{this.state.selectedJoke}</h1>
        </div>
        <div id="waiting-loading">
          <img className="loading-icon" src={ghost} alt="Loading Icon" />
        </div>
      </div>
    );
  }
}

const MobileWaitingWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <MobileWaiting {...props} socket={socket} />}
  </SocketContext.Consumer>
);

function mapStateToProps(reduxState) {
  return {
    game: reduxState.socket.game,
  };
}


export default withRouter(connect(mapStateToProps)(MobileWaitingWithSocket));
