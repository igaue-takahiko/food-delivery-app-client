import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { makeStyles, Grid, Typography } from '@material-ui/core';

import { HomeHero, SearchBar } from '../components';

const useStyles = makeStyles(() => ({
  center: {
    textAlign: "center"
  },
  searchBer: {
    margin: "24px 8rem"
  }
}))

const Home = () => {
  const classes = useStyles()
  const { loading } = useSelector(state => state)
  const { account: { role }, authenticated } = useSelector(state => state.auth)

  const [ locationStatus, setLocationStatus ] = useState(
    localStorage.getItem('location') ? true: false
  )

  const restaurantMarkup = loading

  return (
    <>
    {authenticated && role === "ROLE_SELLER" ? (
      <Redirect to="/seller/dashboard" />
    ) : (
      <>
      <HomeHero />
        <Grid container direction="column">
          <Grid item>
            <Typography className={classes.center} variant="h5" noWrap>
              DeliveryHubでお届けするお気に入りの料理&nbsp;&nbsp;
              <span style={{ fontSize: 40 }}>🍽</span>
            </Typography>
          </Grid>
          <Grid item className={classes.searchBer}>
            <SearchBar page="home" action={setLocationStatus} />
          </Grid>
          <Grid item container>
            <Grid item xs={false} sm={1} />
            <Grid item xs={12} sm={10}>
              {locationStatus ? (
                restaurantMarkup
              ) : (
                <Typography className={classes.center} variant="body1" noWrap>
                  近くのお店を表示するには、場所を入力してください。
                </Typography>
              )}
            </Grid>
            <Grid item xs={false} sm={1} />
          </Grid>
        </Grid>
      </>
    )}
    </>
  )
}

export default Home
