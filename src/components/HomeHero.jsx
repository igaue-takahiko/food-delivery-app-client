import React from 'react'
import { useHistory } from 'react-router-dom';
import { makeStyles, Typography, Button } from '@material-ui/core';
import HeroImage from '../images/heroImage.jpg';

const useStyles = makeStyles(() => ({
  presentation: {
    display: "flex",
    width: "90%",
    margin: "auto",
    minHeight: "80vh",
    alignItems: "center",
    "@media (max-width:1024px)": {
      flexDirection: "column",
    }
  },
  introduction: {
    flex: 1,
    margin: "24px 16px 24px 0",
    paddingLeft: 60,
    height: "340px",
  },
  safeFood: {
    fontSize: 64,
    fontWeight: 400,
  },
  delivery: {
    color: "#157a21",
    fontSize: 64,
    fontWeight: "bold",
    marginTop: -30,
    marginBottom: 20,
  },
  paragraph: {
    width: 400,
    fontSize: 14.5
  },
  cover: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    height: "72vh",
  },
  coverImg: {
    height: "100%",
  },
  ctaOrder: {
    fontSize: 16,
    backgroundColor: "#f5f61f",
    marginTop: 30
  }
}))

const HomeHero = () => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <section className={classes.presentation}>
      <div className={classes.introduction}>
        <Typography className={classes.safeFood} noWrap>
          Safe Food
        </Typography>
        <Typography className={classes.delivery} noWrap>
          Delivery
        </Typography>
        <Typography className={classes.paragraph} variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.
        </Typography>
        <Button
          className={classes.ctaOrder} variant="outlined"
          onClick={() => history.push('/login')}
        >
          Order Now
        </Button>
      </div>
      <div className={classes.cover}>
        <img className={classes.coverImg} src={HeroImage} alt="safe-delivery"/>
      </div>
    </section>
  )
}

export default HomeHero
