import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { apiInstance } from './utils/apiInstance';

import { logout, getUserData } from './redux/user/actions';
import { userTypes } from './redux/user/types';
import { AuthRoute, SellerRoute, UserRoute } from './utils/route';
import ScrollToTop from './utils/scrollToTop';

import { Header, Footer, NotFound } from './components';

import {
  Home,
  Login,
  Signup,
  AddRestaurant,
  Restaurant,
  Cart,
  Dashboard,
  Orders
} from './pages';

const App = () => {
  const dispatch = useDispatch()

  const token = localStorage.jwt;

  if (token) {
    const decodedToken = jwtDecode(token)
    if (decodedToken.exp * 1000 < Date.now()) {
      dispatch(logout())
      window.location.href = "/login"
    } else {
      dispatch({ type: userTypes.SET_AUTHENTICATED })
      apiInstance.defaults.headers.common["Authorization"] = token
      dispatch(getUserData())
    }
  }

  return (
    <>
      <Header />
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={Home} />
        <AuthRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/register" component={Signup} />
        <AuthRoute exact path="/add-restaurant" component={AddRestaurant} />

        <UserRoute exact path="/order/:restName" component={Restaurant} />
        <UserRoute exact path="/cart" component={Cart} />
        <UserRoute exact path="/orders" component={Orders} />

        <SellerRoute exact path="/seller/dashboard" component={Dashboard} />
        <SellerRoute exact path="/seller/orders" component={Orders} />

        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
