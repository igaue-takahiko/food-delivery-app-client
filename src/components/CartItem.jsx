import React from 'react'
import { useDispatch } from 'react-redux';
import { Card, CardContent, Typography, makeStyles, Grid } from '@material-ui/core';
import { Remove, Delete, Add } from '@material-ui/icons';

import CustomButton from '../utils/CustomButton';
import { addToCart, deleteCartItem, removeCartItem } from '../redux/data/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  buttonsContainer: {
    display: "flex",
    marginTop: "8px",
    justifyContent: "space-between",
  },
  buttons: {
    margin: "0 4px"
  },
  itemTotal: {
    marginTop: "16px",
  },
  imgCover: {
    height: "100%",
    width: "100%"
  },
}))

const CartItem = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const {
    quantity,
    itemId: { title, price, description, imageUrl, _id },
  } = props;

  const imageUrlSplit = imageUrl.split("\\");
  const finalImageUrl = `${process.env.REACT_APP_SERVER_URL}/${imageUrlSplit[0]}`

  const handleAddItem = () => {
    const itemData = {
      itemId: _id
    }
    dispatch(addToCart(itemData))
  }

  const handleDeleteItem = () => {
    const itemData = {
      itemId: _id
    }
    dispatch(deleteCartItem(itemData))
  }

  const handleRemoveItem = () => {
    dispatch(removeCartItem(_id))
  }

  return (
    <>
      <Card variant="outlined" style={{ marginBottom: 16 }} con>
        <Grid container  direction="row">
          <Grid item xs={12} sm={4}>
            <div className={classes.imgCover}>
              <img src={finalImageUrl} alt="商品画像" height="100%" width="100%" />
            </div>
          </Grid>
          <Grid item xs={12} sm={8}>
            <CardContent>
              <Typography component="h5" variant="h5" style={{ textAlign: "center" }}>
                {title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {description}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {`¥ ${(price).toLocaleString()} × ${quantity}人前`}
              </Typography>
              <div className={classes.buttonsContainer}>
                <div className={classes.buttons}>
                  <CustomButton tip="減らす" onClick={handleRemoveItem}>
                    <Remove style={{ color: "#f44336" }} />
                  </CustomButton>
                  <CustomButton tip="増やす" onClick={handleAddItem}>
                    <Add style={{ color: "green" }} />
                  </CustomButton>
                  <CustomButton tip="削除" onClick={handleDeleteItem}>
                    <Delete style={{ color: "#f44336" }} />
                  </CustomButton>
                </div>
                <Typography
                  className={classes.itemTotal}
                  variant="body1" color="textPrimary"
                >
                  {`合計金額 ¥ ${(price * quantity).toLocaleString()}`}
                </Typography>
              </div>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default CartItem
