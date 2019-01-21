import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        this is App
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
