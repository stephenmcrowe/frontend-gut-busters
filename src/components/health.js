import React from 'react';
import axios from 'axios';

const ROOT_URL = 'https://gut-busters.herokuapp.com/api';
// const ROOT_URL = 'http://localhost:9090/api';

class Health extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'API',
      version: 0,
    };
  }

  componentDidMount() {
    this.healthCheck();
  }

  healthCheck() {
    axios.get(`${ROOT_URL}/`)
      .then((results) => {
        this.setState({ message: results.data.message, version: results.data.version });
      });
  }

  renderHealth() {
    return <p> {this.state.message}: v{this.state.version} </p>;
  }

  render() {
    return (
      <div>
        {this.renderHealth()}
      </div>
    );
  }
}

export default Health;
