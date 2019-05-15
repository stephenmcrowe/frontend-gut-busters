import React from 'react';
import axios from 'axios';

const ROOT_URL = 'https://gut-busters.herokuapp.com/api';
// const ROOT_URL = 'http://localhost:9090/api';

class Health extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: 'GUT BUSTER API',
      version: 'UNKNOWN',
    };
  }

  componentDidMount() {
    this.healthCheck();
  }

  healthCheck() {
    axios.post(`${ROOT_URL}/`, { key: this.state.key })
      .then((results) => {
        this.setState({ version: results.data.value });
      });
  }

  renderHealth() {
    return <p> {this.state.key}: {this.state.version} </p>;
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
