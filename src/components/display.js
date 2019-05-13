// literally just display everything
import { React, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchQuestions } from '../actions/index';

// const Display = (props) => {
//   return (
//     <div className="displayWrapper"> <h1> Hello world!</h1>
//     </div>
//   );
// };

// export default Display;

const questionWrapper = (question) => {
  return (
    <div id="questions">Question: {question}</div>
  );
};

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchQuestions();
  }

  render() {
    return (
      <div>
        <div id="questionsHeader">
          <h1>HELLO WORLD</h1>
        </div>
        <div className="questionBox">
          {this.props.all.map((question) => {
            return questionWrapper(question);
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    all: state.questions.all,
  }
);

export default withRouter(connect(mapStateToProps, { fetchQuestions })(Display));
