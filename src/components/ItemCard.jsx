import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Edit, Delete } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  makeStyles,
  Snackbar,
} from '@material-ui/core';

import { useForm } from '../hooks/forms';
import { editItem, deleteItem, addToCart } from '../redux/data/actions';

import { ItemDialog } from '../components';
import CustomButton from '../utils/CustomButton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    height: 180,
    width: "70%",
    objectFit: "cover"
  },
  snackbar: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}))

const MuiAlert = (props) => (
  <Alert elevation={6} variant="filled" {...props} />
)

const ItemCard = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { authenticated, account: { role } } = useSelector(state => state.user)
  const { addCartSuccess } = useSelector(state => state.data)

  const { title, imageUrl, description, price, _id } = props

  const [ open, setOpen ] = useState(false)
  const [ openSnackBar, setOpenSnackBar ] = useState(false)
  const [ image, setImage ] = useState(null)

  const { inputs, handleInputChange } = useForm({
    title: "",
    description: "",
    price: "",
  })

  const imageUrlSplit = imageUrl.split("\\")
  const finalImageUrl = `${process.env.REACT_APP_SERVER_URL}/${imageUrlSplit[0]}`

  const handleOpenSnackBar = () => {
    if (addCartSuccess || addCartSuccess === null) {
      setOpenSnackBar(true)
    }
  }

  const handleCloseSnackBar = (e, reason) => {
    if (reason === "clickaway") {
      setOpenSnackBar(false)
      return
    }
    setOpenSnackBar(false)
  }

  const handleFileSelect = (e) => {
    setImage(e.target.files[0])
  }

  const handleCart = () => {
    const itemData = {
      itemId: _id
    }
    dispatch(addToCart(itemData))
  }

  const handleDelete = () => {
    dispatch(deleteItem(_id))
  }

  const openEdit = () => {
    inputs.title = title
    inputs.price = price
    inputs.description = description
    setOpen(true)
  }

  const handleClose = () => {
    inputs.title = ""
    inputs.description = ""
    inputs.price = ""
    setImage(null)
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const itemData = new FormData()
    if (image !== null) {
      itemData.append("image", image)
    } else {
      itemData.append("image", imageUrl)
    }
    itemData.append("title", inputs.title)
    itemData.append("description", inputs.description)
    itemData.append("price", inputs.price)
    dispatch(editItem(itemData, _id))
    handleClose()
  }

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h5" component="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {description}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {`¥ ${(price).toLocaleString()}`}
            </Typography>
          </CardContent>
          {role === "ROLE_SELLER" ? (
            <div style={{ textAlign: "center" }}>
              <CustomButton tip="編集" onClick={openEdit}>
                <Edit style={{ color: "green" }} />
              </CustomButton>
              <CustomButton tip="削除" onClick={handleDelete}>
                <Delete style={{ color: "#f44336" }} />
              </CustomButton>
            </div>
          ) : authenticated ? (
            <Button
              style={{
                color: "#000",
                width: "60%",
                marginLeft: "20%",
                marginBottom: "10%"
              }}
              color="secondary" variant="contained"
              onClick={() => {
                handleCart()
                handleOpenSnackBar()
              }}
            >
              カートに追加
            </Button>
          ) : (
            <Link to="/login">
            <Button
              style={{
                color: "#000",
                width: "60%",
                marginLeft: "20%",
                marginBottom: "10%"
              }}
            >
              カートに追加
            </Button>
            </Link>
          )}
        </div>
        <CardMedia
          className={classes.cover}
          title="商品の注文" image={finalImageUrl}
        />
      </Card>
      <ItemDialog
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        handleFileSelect={handleFileSelect}
        inputs={inputs}
        handleInputChange={handleInputChange}
      />
      <div className={classes.snackbar}>
        <Snackbar
          open={openSnackBar}
          autoHideDuration={3600}
          onClick={handleCloseSnackBar}
        >
          <MuiAlert
            style={{ backgroundColor: "#157a21" }}
            onClick={handleCloseSnackBar}
          >
            商品がカートに追加されました！
          </MuiAlert>
        </Snackbar>
      </div>
    </>
  )
}

export default ItemCard
