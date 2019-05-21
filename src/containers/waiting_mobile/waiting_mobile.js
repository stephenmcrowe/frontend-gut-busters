/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './waiting_mobile.scss';

// waiting page displays
// an api generated joke
// loading image that moves
// listens for start game from server that pushes to the next page

class mobileWaiting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
      selectedJoke: '',
      random: 0,
    //   gameStart: false, // game start listen change with server
    };
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
        const min = 1;
        const max = this.state.jokes.length;
        const rand = min + Math.random() * (max - min);
        // this.state.random = this.state.random + rand;
        this.setState({ random: this.state.random + rand });
        // this.selectedJoke: this.state.jokes.find(random).jokeText;
        this.setState({ selectedJoke: this.state.jokes.find(random).jokeText });
        // this.setState({ selectedJoke: })
      });
    // get random integer from 0 to length of array
    // gettings becomes an action
  }

  render() {
    // if (!this.state.gameStart) {

    return (
      <div id="mobileWaiting-Wrapper">
        <div id="waiting-Joke">
          <h1>{this.selectedJoke}</h1>
          {/* figure out how to loop through the jokes here that are
            specifically ghost related */}
        </div>
        <div id="waiting-Loading">
          <div className="baseLoading" />
          {/* loading image that moves do it with CSS */}
        </div>
        <div id="waiting-Info">
          <div>
                Waiting information: here is what you need to know!
          </div>
        </div>
      </div>
    );
  }
}

export default mobileWaiting;
