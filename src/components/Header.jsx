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
  List,
  ListItem,
  ListItemText,
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
  drawerButtonStyle: {
    margin: "16px 32px 16px",
    color: "black",
  },
}))

const Header = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const { container } = props
  const {
    account: { role },
    authenticated,
    address,
  } = useSelector(state => state.user)

  const [ openDrawer, setOpenDrawer ] = useState(false)

  const handleLogout = () => {
    setOpenDrawer(false)
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
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          open={openDrawer} anchor="right"
          onClose={handleDrawerToggle}
          container={container}
          ModalProps={{ keepMounted: true }}
          variant="temporary"
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
            <List>
              <Link to="/login">
                <ListItem
                  button
                  className={classes.drawerButtonStyle} onClick={handleDrawerToggle}
                >
                  Login
                </ListItem>
              </Link>
              <Link to="/register">
                <ListItem
                  button
                  className={classes.drawerButtonStyle}
                  onClick={handleDrawerToggle}
                >
                  <ListItemText primary="signin" />
                </ListItem>
              </Link>
            </List>
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
