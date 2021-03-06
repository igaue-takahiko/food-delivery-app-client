import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';

import { logout } from '../redux/auth/actions';

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#e8ede1",
    marginBottom: 10
  },
  title: {
    flex: 1,
    marginLeft: 60,
    color: "black"
  },
  buttonStyle: {
    margin: "0 8px 0",
    display: "inline-block",
    color: "black",
  },
  buttons: {
    marginRight: 60,
  },
  name: {
    fontStyle: "bold",
    fontSize: 32,
  },
}))

const Header = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    account: { role },
    authenticated,
    firstName,
    lastName,
    address,
  } = useSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(logout(history))
  }

  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar>
        <Link to="/" className={classes.title}>
          <Typography variant="h6" noWrap>
            <span>DeliveryHub</span>
          </Typography>
        </Link>
          {authenticated ? (
            role === "ROLE_SELLER" ? (
              <div className={classes.buttons}>
                <Typography className={classes.buttonStyle}>
                  Dashboard
                </Typography>
                <Link to="/seller/orders">
                  <Button className={classes.buttonStyle}>
                    Orders
                  </Button>
                </Link>
                <Button
                  className={classes.buttonStyle}
                  variant="outlined"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className={classes.buttons}>
                <Typography className={classes.buttonStyle}>
                  こんにちは、{firstName} {lastName}
                </Typography>
                <Link to="/orders">
                  <Button className={classes.buttonStyle}>
                    Orders
                  </Button>
                </Link>
                <Link to={{ pathname: "/cart", state: { address } }}>
                  <Button className={classes.buttonStyle}>
                    Cart
                  </Button>
                </Link>
                <Button
                  className={classes.buttonStyle}
                  variant="outlined"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            )
          ) : (
            <div className={classes.buttons}>
              <Link to="/login">
                <Button className={classes.buttonStyle}>
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className={classes.buttonStyle} variant="outlined">
                  signup
                </Button>
              </Link>
            </div>
          )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
