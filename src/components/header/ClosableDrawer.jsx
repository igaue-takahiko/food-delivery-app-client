import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {
  makeStyles,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  ListItemIcon,
  Divider
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  drawerButtonStyle: {
    color: "black",
  },
  toolBar: {
    width: 240,
    marginTop: 24
  }
}))

const ClosableDrawer = ({ openDrawer, handleLogout, handleDrawerToggle, container }) => {
  const classes = useStyles()

  const {
    account: { role },
    authenticated,
    address,
  } = useSelector(state => state.user)

  return (
    <Drawer
          open={openDrawer} anchor="right"
          onClose={handleDrawerToggle}
          container={container}
          ModalProps={{ keepMounted: true }}
          variant="temporary"
        >
          <div style={{ height: 56, backgroundColor: "#e8ede1" }} />
          <Divider />
          <Toolbar className={classes.toolBar}>
            {authenticated ? (
              role === "ROLE_SELLER" ? (
                <List style={{ margin:"0 auto", width: "100%" }}>
                  <Link to="/seller/dashboard">
                    <ListItem
                      button
                      className={classes.drawerButtonStyle} onClick={handleDrawerToggle}
                    >
                      <ListItemIcon>
                        <DashboardIcon />
                      </ListItemIcon>
                      <ListItemText primary="Dashboard" />
                    </ListItem>
                  </Link>
                  <Link to="/seller/orders">
                    <ListItem
                      button
                      className={classes.drawerButtonStyle} onClick={handleDrawerToggle}
                    >
                      <ListItemIcon>
                        <BorderColorIcon />
                      </ListItemIcon>
                      <ListItemText primary="Orders" />
                    </ListItem>
                  </Link>
                  <ListItem
                    className={classes.drawerButtonStyle}
                    button
                    onClick={handleLogout}
                  >
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </List>
              ) : (
                <List  style={{ margin:"0 auto", width: "100%" }}>
                  <Link to="/orders">
                    <ListItem
                      button
                      className={classes.drawerButtonStyle} onClick={handleDrawerToggle}
                    >
                      <ListItemIcon>
                        <BorderColorIcon />
                      </ListItemIcon>
                      <ListItemText primary="Orders" />
                    </ListItem>
                  </Link>
                  <Link to={{ pathname: "/cart", state: { address } }}>
                    <ListItem
                      button
                      className={classes.drawerButtonStyle} onClick={handleDrawerToggle}
                    >
                      <ListItemIcon>
                        <ShoppingCartIcon />
                      </ListItemIcon>
                      <ListItemText primary="Cart" />
                    </ListItem>
                  </Link>
                  <ListItem
                    className={classes.drawerButtonStyle}
                    button
                    onClick={handleLogout}
                  >
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </List>
              )
            ) : (
              <List style={{ margin:"0 auto", width: "100%" }} >
                <Link to="/login">
                  <ListItem
                    button
                    className={classes.drawerButtonStyle} onClick={handleDrawerToggle}
                  >
                    <ListItemIcon>
                      <LockOpenIcon />
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                  </ListItem>
                </Link>
                <Link to="/register">
                  <ListItem
                    button
                    className={classes.drawerButtonStyle}
                    onClick={handleDrawerToggle}
                  >
                    <ListItemIcon>
                      <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="signin" />
                  </ListItem>
                </Link>
              </List>
            )}
          </Toolbar>
        </Drawer>
  )
}

export default ClosableDrawer
