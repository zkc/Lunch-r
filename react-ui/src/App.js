import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const socket = require('socket.io-client')()


///to join a group, take group id and send socket message on after mounting.
//router ignores id but uses it to send a websocket message back. 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fetching: true
    };
  }

  componentDidMount() {
    socket.on('usersConnected', (count) => {
      console.log('Connected Users: ' + count);
      socket.send('Join Group', 'abc123')
    });


    fetch('/api')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          message: json.message,
          fetching: false
        });
      }).catch(e => {
        this.setState({
          message: `API call failed: ${e}`,
          fetching: false
        });
      })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          {'This is '}
          <a href="https://github.com/mars/heroku-cra-node">
            {'create-react-app with a custom Node/Express server'}
          </a><br/>
        </p>
        <p className="App-intro">
          {this.state.fetching
            ? 'Fetching message from API'
            : this.state.message}
        </p>
      </div>
    );
  }
}

export default App;
