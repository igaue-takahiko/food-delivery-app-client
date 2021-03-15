import React from 'react'
import { useSelector } from 'react-redux';
import { makeStyles, Grid } from '@material-ui/core';

import ItemCard from './ItemCard';

const useStyles = makeStyles(() => ({
  para: {
    fontSize: "x-large",
    margin: "0 auto"
  },
  paraSeller: {
    fontSize: "x-large",
    margin: "0 auto"
  },
}));

const RestaurantItems = ({ items }) => {
  const classes = useStyles()
  const { account: { role } } = useSelector(state => state.user)
  return (
    <Grid item container direction="row" style={{ margin: "24px 0" }}>
      <Grid item xs={12} sm={1} />
      <Grid item xs={12} sm={10}>
        <Grid container spacing={2}>
          {items ? (
            items.length > 0 ?(
              items.map((item) => (
                <Grid item xs={12} sm={4} key={item._id}>
                  <ItemCard {...item}/>
                </Grid>
              ))
            ) : role === "ROLE_SELLER" ? (
              <p className={classes.paraSeller}>
                最初の注文をするには、商品の追加をしてください。
              </p>
            ) : (
              <p className={classes.para}>
                注文する商品がありません。再度、ログインして下さい。
              </p>
            )
          ) : null}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={1} />
    </Grid>
  )
}

export default RestaurantItems
