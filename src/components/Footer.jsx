import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles, Grid, Typography, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#e8ede1",
    marginTop: 40,
    height: "42vh",
    textAlign: "center",
  },
  innerCont: {
    margin: "74px 40px 40px 40px",
  },
  resources: {
    margin: "60px 40px 10px 40px",
  },
  buttonStyleOne: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
  },
  buttonStyleTwo: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    marginLeft: 10,
    marginTop: 8,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
  }
}))

const Footer = () => {
  return (
    <div>
      
    </div>
  )
}

export default Footer
