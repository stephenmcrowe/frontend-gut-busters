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
import { pushStage } from '../../actions/submitActions';


const randomInt = require('random-int');

class MobileWaiting extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      selectedJoke: '',
    };

    // Listeners
    // this.props.socket.on('see_scores', () => {
    //   moveOn(this.props.socket, this.props.history, 'mobile/score');
    // });
    // this.props.socket.on('vote', (id) => {
    //   console.log('received vote event');
    //   console.log(id);
    //   moveOn(this.props.socket, this.props.history, (`mobile/vote/${id}`));
    // });
    // this.props.socket.on('vote', (id) => {
    //   console.log('received vote event');
    //   moveOn(this.props.socket, this.props.history, (`mobile/vote/${id}`));
    // });
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

    pushStage(this.props.socket, this.props.history);
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
        <div id="waiting-info">
          <h2>
            {/* TODO: argument based on which component is next */}
            Waiting information: here is what you need to know!
          </h2>
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
