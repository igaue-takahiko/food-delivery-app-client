import React from 'react'
import { useSelector } from 'react-redux';
import { Typography, Grid } from '@material-ui/core';

import RestaurantCard from './RestaurantCard';

const RestaurantContent = () => {
  const { restaurants } = useSelector(state => state.data)
  const restaurantArray = restaurants.restaurants

  const getRestaurantCard = (restaurantObj) => (
    <Grid item xs={12} sm={3} key={restaurantObj._id}>
      <RestaurantCard {...restaurantObj} />
    </Grid>
  )

  return (
    <div style={{ textAlign: "center" }}>
      <Typography
        gutterBottom variant="h6" component="p"
        color="textPrimary" noWrap
      >
      お気に入りの飲食店から注文する
      </Typography>
      <br/>
      <Grid container spacing={2}>
        {restaurantArray ? (
          restaurantArray.length > 0 ? (
            restaurantArray.map((restaurant) => getRestaurantCard(restaurant))
          ) : (
            <p style={{ margin: "0 auto" }}>
              お住まいの地域で現在利用できるレストランはありません。
            </p>
          )
        ) : (
          <p style={{ margin: "0 auto" }}>
            サーバーエラー、再度お試しください。
          </p>
        )}
      </Grid>
    </div>
  )
}

export default RestaurantContent
