import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

const Header = () => <h2>Header</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>App renders!</h1>
        <a href="/auth/google">Sign In with Google</a>
      </div>
    );
  }
}

export default hot(module)(App);
