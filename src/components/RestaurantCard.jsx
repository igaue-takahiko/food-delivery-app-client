import React from 'react'
import { Link } from 'react-router-dom';
import {
  makeStyles,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@material-ui/core';

import SwiperImages from './SwiperImages';

const useStyles = makeStyles(() => ({
  cardContent: {
    marginTop: "-40px"
  }
}))
const RestaurantCard = (props) => {
  const classes = useStyles()

  const {
    name,
    tags,
    costForOne,
    minOrderAmount,
    payment,
    imageUrl,
    _id,
  } = props

  let restUrl = name.split(" ")
  restUrl = restUrl.join("-").toLowerCase()
  let paymentString

  if (payment.length === 1) {
    paymentString = `${payment[0].toLowerCase()}でお支払いできます。`
  }

  if (payment.length === 2) {
    paymentString = `${payment[0].toLowerCase()} & ${payment[1].toLowerCase()}でお支払いできます。`
  }

  return (
    <Card variant="outlined">
      <SwiperImages images={imageUrl} type="home" />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" noWrap>
          {tags}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {`一回分の最低、配達料 ¥${costForOne}`}
        </Typography>
        <Typography variant="body2" color="textPrimary">
          {`注文の最低額 ¥${minOrderAmount}`}
        </Typography>
        <Typography variant="body2" color="textPrimary">
          {paymentString}
        </Typography>
      </CardContent>
      <hr/>
      <CardActions>
        <Link
          to={{
            pathname: `order/${restUrl}`,
            state: { restId: _id }
          }}
        >
        <Button size="small" color="primary">
          注文する
        </Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default RestaurantCard
