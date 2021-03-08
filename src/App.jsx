import React from 'react';
import { Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import store from './redux/store/store';
import { logout, getUserData } from './redux/auth/actions';
import { authTypes } from './redux/auth/types';
import { AuthRoute, SellerRoute, UserRoute } from './utils/route';

import { Header, Footer } from './components';

import { Home, Login, Signup } from './pages';

const token = localStorage.jwt

if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logout())
    window.location.href = "/login"
  } else {
    store.dispatch({ type: authTypes.SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <AuthRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/register" component={Signup} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
