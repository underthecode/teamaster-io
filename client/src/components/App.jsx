import React from 'react';
import { hot } from 'react-hot-loader';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>app renders!</h1>
        <a href="/auth/google">sign in with Google</a>
      </div>
    );
  }
}

export default hot(module)(App);
