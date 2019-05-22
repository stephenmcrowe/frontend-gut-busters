import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startGame } from '../../actions';
import { NavLink, withRouter } from 'react-router-dom';

/* 
listens for players coming in
store player info as local state for now
Navlink to start round aka questions
*/


// will get posts eventually
function mapStateToProps(reduxState) {
    // console.log(reduxState);
    return {
        room_id: reduxState.game.id,
      players: reduxState.game.players,
    };
  }

class waitingroom_desktop extends Component {
    constructor(props) {
        super(props);
    
        this.state = {};
  
        this.onStartRound = this.onStartRound.bind(this);
        this.renderPage = this.renderPage.bind(this);
        this.renderPlayers = this.renderPlayers.bind(this);
        this.renderButton= this.renderButton.bind(this);
      }

  onStartRound() {
    event.preventDefault();
    this.props.startRound(this.state);
  }
  
  renderPage() {
    // did assuming whole background image/title/logo is just one image other than the button
    return (
        <div id="waiting">
          <div id="roome code"> 
          <h1>Room Code: </h1>
           this.state
          </div>
          <div id="start_game">
            <button onClick={this.onStartGame} id="start_game_button"><NavLink to="/waitingDesktop">Start Game</NavLink></button>
          </div>
        </div>
      );
    }

    renderPlayers() {
        // did assuming whole background image/title/logo is just one image other than the button
        return (
            <div id="landing_desktop">
              <div id="background"> 
                  <div className="logo_title_img" />
              </div>
              <div id="start_game">
                <button onClick={this.onStartGame} id="start_game_button"><NavLink to="/waitingDesktop">Start Game</NavLink></button>
              </div>
            </div>
          );
        }

        
        renderButton() {
            // did assuming whole background image/title/logo is just one image other than the button
            return (
                  <div id="start_round_button">
                    <button onClick={this.onStartRound} id="start_round_button"><NavLink to="/question_desktop">Start Round</NavLink></button>
                  </div>
              
              );
            }
        
componentDidMount() {
    this.props.getPlayers();
    }
    
  render() {
    return (
      <nav>
        <div className="waiting">
          {this.renderPage()}
          {this.renderPlayers()}
          {this.renderButton()}  
        </div>
      </nav>
    );
    }
}

export default withRouter(connect(Null, {startRound})(waitingroom_desktop));
    