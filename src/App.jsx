import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Header } from './components';

import { Home, Login, Signup } from './pages';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Signup} />
      </Switch>
    </>
  );
}

export default App;
