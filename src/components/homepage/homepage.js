import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SocketContext from '../../socket-context';
import './homepage.scss';
import logo from '../../img/ghostbusters_logo.png';
import frame from '../../img/frame.png';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <nav>
        <div className="homepage">
          <div className="landing">
            <div className="left">
              <h1>Gut Busters</h1>
              <img src={logo} alt="Gut Busters" />
              <h1>Fun game... Seriously.</h1>
            </div>
            <div className="right">
              <h3>Each player, visit the following link on your phone...</h3>
              <img src={frame} alt="QR Code" />
              {/* <NavLink to="/mobile"><h2>gut-busters.surge.sh/mobile</h2></NavLink> */}
              <a href="http://gut-busters.surge.sh/mobile"><h2>gut-busters.surge.sh/mobile</h2></a>
              <h3>When you are ready to begin the game, click here...</h3>
              <a href="http://gut-busters.surge.sh/desktop"><h2>gut-busters.surge.sh/desktop</h2></a>
              {/* <NavLink to="/desktop"><h2>gut-busters.surge.sh/desktop</h2></NavLink> */}
            </div>
          </div>
          <div className="information">
            <div className="instructions">
              <h2>
                Instructions
              </h2>
              <ol>
                <li>Grab your friends and a charged smart phone or computer for every player.</li>
                <li>Each player, navigate to gut-busters.surge.sh/mobile on your device (scan the QR code above if you don’t want to type!)</li>
                <li>You will have 30 seconds to submit your own answer to 2 prompts. Quick, use that wit!</li>
                <li>When time is up, you will have 15 seconds to vote on the funniest answer for each question.</li>
                <li>See which of your friends had the funniest responses!</li>
              </ol>
            </div>
            <div className="about">
              <h2>About</h2>
              <p>
              As Cards Against Humanity and Apples to Apples enthusiests, we built Gut Busters as our final project for our CS52 class at
              Dartmouth College in an effort to build on those awesome games to enhance the creativity of game play! Now, decks will never
              again become stale. Enter your own responses to funny prompts to let your personal sense of humor shine and entertain your
              audience to the fullest.
              </p>
            </div>
            <div className="team">
              <h2>
                Team
              </h2>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const HomepageWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <Homepage {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default withRouter(connect(null, null)(HomepageWithSocket));
