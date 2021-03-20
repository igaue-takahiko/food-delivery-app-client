import React from 'react'
import { useSelector } from 'react-redux';
import { makeStyles, Typography, Grid } from '@material-ui/core';

import Spinner from '../utils/spinner/Spinner';
import SwiperImages from './SwiperImages';

const useStyles = makeStyles(() => ({
  border: {
    padding: "0 24px 24px",
    borderLeft: "2px solid #000",
    borderBottom: "2px solid #000",
    width: "44%",
  },
}))

const RestaurantInfo = (props) => {
  const classes = useStyles()
  const { loading } = useSelector(state => state.data)

  const {
    name,
    imageUrl,
    tags,
    costForOne,
    minOrderAmount,
    payment,
    address,
  } = props;

  let paymentString;
  let phoneNo;
  let addressString;

  if (address) {
    phoneNo = address.phoneNo;
    addressString = `${address.locality} ${address.street} ${address.aptName}`;
  }

  if (payment ? payment.length === 1 : null) {
    paymentString = `可能な支払い方法 ${payment[0].toLowerCase()}`
  }

  if (payment ? payment.length === 2 : null) {
    paymentString = `可能な支払い方法 ${payment[0].toLowerCase()} & ${payment[1].toLowerCase()}`
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Grid container direction="row">
            <Grid item xs={false} sm={1} />
            <Grid item xs={12} sm={6} style={{ marginTop: "120px" }}>
              <div className={classes.border}>
                <Typography
                  style={{ fontStyle: "bold" }}
                  gutterBottom variant="h4"
                  component="h2"
                >
                  {name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  ジャンル: {tags}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  受けれる人数 {costForOne}人前から
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  注文の最低額 ¥{minOrderAmount}
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  {paymentString}
                </Typography>
                <br />
                <Typography variant="body2" color="textPrimary">
                  住所: {addressString}
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  電話番号: +81 {phoneNo}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={4} style={{ marginTop: 32 }}>
              {imageUrl ? (
                <SwiperImages type="restaurant" images={imageUrl} />
              ) : null }
            </Grid>
            <Grid item xs={false} sm={1} />
          </Grid>
        </>
      )}
    </>
  )
}

export default RestaurantInfo
