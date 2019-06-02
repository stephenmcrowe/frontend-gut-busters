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
import { fetchGame, currentVote } from '../../actions/index';
import { pushStage, moveOn } from '../../actions/submitActions';


const randomInt = require('random-int');

class MobileWaiting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
      selectedJoke: '',
    };

    // Listeners
    // this.props.socket.on('see_scores', () => {
    //   moveOn(this.props.socket, this.props.history, 'mobile/score');
    // });
    this.props.socket.on('vote', (id) => {
      console.log('received vote event');
      console.log(id);
      currentVote(id);
      moveOn(this.props.socket, this.props.history, (`mobile/vote/${id}`));
    });

    // this.props.socket.on('vote', (id) => {
    //   console.log('received vote event');
    //   moveOn(this.props.socket, this.props.history, (`mobile/vote/${id}`));
    // });
  }


  componentDidMount() {
    axios.get('https://icanhazdadjoke.com/search?term=ghost', {
      headers: { Accept: 'application/json' },
    })
      .then((response) => {
        // generate random int
        // save that one to state given length
        const jokes = response.data.results.map(joke => ({
          jokeID: joke.id,
          jokeText: joke.joke,
        }));
        this.setState({ jokes });
        // const min = 1;
        // const max = this.state.jokes.length;
        // const rand = min + Math.random() * (max - min);
        const random = randomInt(0, this.state.jokes.length - 1);
        // this.state.random = this.state.random + rand;
        // this.setState({ random: this.state.random + rand });
        // this.selectedJoke: this.state.jokes.find(random).jokeText;

        // this.setState({ selectedJoke: this.state.jokes.find(random).jokeText });
        const newObject = Object.assign({}, this.state.jokes.find(random).jokeText);
        this.setState({ selectedJoke: newObject });

        // this.setState({ selectedJoke: })
      }).catch((error) => {
        // console.log('rip waiting joke');
      });
    this.props.fetchGame(this.props.socket);
    // get random integer from 0 to length of array
    // gettings becomes an action
    pushStage(this.props.socket, this.props.history);
  }

  render() {
    return (
      <div id="mobile-waiting-page">
        <div id="waiting-joke">
          {/* <h1>{this.selectedJoke}</h1> */}
          {/* figure out how to loop through the jokes here that are
            specifically ghost related */}
          <h1>If you&apos;ve got it... Haunt it!</h1>
        </div>
        <div id="waiting-loading">
          <img className="loading-icon" src={ghost} alt="Loading Icon" />
          {/* <div className="base-loading" /> */}
          {/* loading image that moves do it with CSS */}
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


export default withRouter(connect(mapStateToProps, { fetchGame, currentVote })(MobileWaitingWithSocket));
