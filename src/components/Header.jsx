import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  CssBaseline
} from '@material-ui/core';

import { logout } from '../redux/user/actions';

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#e8ede1",
    marginBottom: 10,
  },
  title: {
    flex: 1,
    marginLeft: "5rem",
    color: "black",
    [theme.breakpoints.down('sm')]: {
      marginLeft: "1rem",
    },
  },
  buttonStyle: {
    margin: "0 8px 0",
    display: "inline-block",
    color: "black",
  },
  buttons: {
    justifyContent: "space-between",
    marginRight: "2rem",
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  menuIcon: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: "50%",
  },
  drawerButtonStyle: {
    margin: "16px 32px",
    color: "black",
  },
  toolbar: theme.mixins.toolbar
}))

const Header = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    account: { role },
    authenticated,
    address,
  } = useSelector(state => state.user)

  const [ openDrawer, setOpenDrawer ] = useState(false)

  const handleLogout = () => {
    setOpenDrawer(!openDrawer)
    dispatch(logout(history))
  }

  const handleDrawerToggle = () => {
    if (!openDrawer) {
      setOpenDrawer(!openDrawer)
    } else {
      setOpenDrawer(false)
    }
  }

  return (
    <AppBar position="sticky" className={classes.header}>
      <Toolbar>
        <Link to="/" className={classes.title}>
          <Typography variant="h5" noWrap>
            <span>DeliveryHub</span>
          </Typography>
        </Link>
        <IconButton
          className={classes.menuIcon} onClick={handleDrawerToggle}
          aria-label="Menu Items"
          aria-controls="menu-appbar"
          aria-haspopup="true"
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          className={classes.drawerPaper}
          open={openDrawer} anchor="right"
          onClose={handleDrawerToggle}
          variant="temporary"
          ModalProps={{ keepMounted: true }}
        >
          {authenticated ? (
            role === "ROLE_SELLER" ? (
              <>
                <Link to="/seller/dashboard">
                  <Button
                    className={classes.drawerButtonStyle} onClick={handleDrawerToggle}
                  >
                    Dashboard
                  </Button>
                </Link>
                <Link to="/seller/orders">
                  <Button
                    className={classes.drawerButtonStyle} onClick={handleDrawerToggle}
                  >
                    Orders
                  </Button>
                </Link>
                <Button
                  className={classes.drawerButtonStyle}
                  variant="outlined"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/orders">
                  <Button
                    className={classes.drawerButtonStyle} onClick={handleDrawerToggle}
                  >
                    Orders
                  </Button>
                </Link>
                <Link to={{ pathname: "/cart", state: { address } }}>
                  <Button
                    className={classes.drawerButtonStyle} onClick={handleDrawerToggle}
                  >
                    Cart
                  </Button>
                </Link>
                <Button
                  className={classes.drawerButtonStyle}
                  variant="outlined"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )
          ) : (
            <>
              <Link to="/login">
                <Button
                  className={classes.drawerButtonStyle} onClick={handleDrawerToggle}
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  className={classes.drawerButtonStyle} variant="outlined"
                  onClick={handleDrawerToggle}
                >
                  signup
                </Button>
              </Link>
            </>
          )}
        </Drawer>
          {authenticated ? (
            role === "ROLE_SELLER" ? (
              <div className={classes.buttons}>
                <Link to="/seller/dashboard">
                  <Button className={classes.buttonStyle}>
                    Dashboard
                  </Button>
                </Link>
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
