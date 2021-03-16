import React from 'react'
import { useDispatch } from 'react-redux';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
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
  buttons: {
    display: "flex",
    flexDirection: "row",
    marginTop: "8px",
  },
  itemTotal: {
    marginLeft: "62%",
    marginTop: "8px",
  },
  imgCover: {
    height: 184,
    width: 270
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
      <Card className={classes.root} variant="outlined">
        <div className={classes.imgCover}>
          <img src={finalImageUrl} alt="商品画像" height="184" width="180" />
        </div>
        <div className={classes.details}>
          <CardContent>
            <Typography component="h5" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {description}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {`¥ ${(price).toLocaleString()} × 個数 ${quantity}`}
            </Typography>
            <div className={classes.buttons}>
              <CustomButton tip="削除" onClick={handleRemoveItem}>
                <Remove style={{ color: "#f44336" }} />
              </CustomButton>
              <CustomButton tip="カートに追加" onClick={handleAddItem}>
                <Add style={{ color: "green" }} />
              </CustomButton>
              <CustomButton tip="削除" onClick={handleDeleteItem}>
                <Delete style={{ color: "#f44336" }} />
              </CustomButton>
              <Typography
                className={classes.itemTotal}
                variant="body1" color="textPrimary"
              >
                {`合計金額 ¥ ${(price * quantity).toLocaleString()}`}
              </Typography>
            </div>
          </CardContent>
        </div>
      </Card>
    </>
  )
}

export default CartItem
