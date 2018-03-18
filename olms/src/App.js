import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Components
import Page from './components/Page';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" component={Page} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
