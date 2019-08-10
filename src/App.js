import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './page/homepage/homepage.component'

const HatsPage = () => (
  <div>
    <Link to='/hats'></Link>
    <h1>HATS PAGE</h1>
  </div>
)

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/hats' component={HatsPage} />
      </Switch>
    </div>
  );
}

export default App;
