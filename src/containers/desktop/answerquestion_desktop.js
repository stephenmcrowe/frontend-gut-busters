function mapStateToProps(reduxState) {
    // console.log(reduxState);
    return {
        round: reduxState.game.round,
    };
  }
 
    const questionAnswer = (props) => {
        return (
      <div classname="question_page">
          <h1>Round</h1>
          {this.props.round}
          <h2>Please Answer Question on Your Screen</h2>
      </div>
    
      );
    };
    
  
  export default  questionAnswer;