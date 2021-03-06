import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { makeStyles, Typography, Button, Grid } from '@material-ui/core';

import { useForm } from '../hooks/forms';
import { SearchBar, RestaurantInfo, RestaurantItems, ItemDialog } from '../components';
import { addItem } from '../redux/data/actions';

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  button: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    width: "40%",
    height: 48,
    margin: "40px auto",
    fontSize: 20,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
  }
}))

const Dashboard = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const sellerData = useSelector(state => state.user)
  const { items } = sellerData

  const [ open, setOpen ] = useState(false)
  const [ image, setImage ] = useState({})
  const [ itemsState, setItemsState ] = useState(items ? [] : null)
  const [ filteredItemsState, setFilteredItemsState ] = useState(items ? [] : null)

  useEffect(() => {
    if (items) {
      setItemsState(items)
      setFilteredItemsState(items)
    }
  },[items])

  const { inputs, handleInputChange } = useForm({
    title: "",
    description: "",
    price: "",
  })

  const handleFileSelect = (e) => {
    setImage(e.target.files[0])
  }

  const handleOpen = () => {
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
    itemData.append("image", image)
    itemData.append("title", inputs.title)
    itemData.append("description", inputs.description)
    itemData.append("price", inputs.price)
    dispatch(addItem(itemData))
    handleClose()
  }

  const handleSearch = (value) => {
    let currentList = []
    let newList = []

    if (value !== "") {
      currentList = itemsState

      newList = currentList.filter((item) => {
        const lc = item.title.toLowerCase()
        const filter = value.toLowerCase()
        return lc.includes(filter)
      })
    } else {
      //?????????????????????????????????newList?????????????????????????????????????????????
      newList = itemsState
    }
    //????????????newList?????????????????????????????????????????????????????????????????????????????????????????????
    setFilteredItemsState(newList)
  }

  return (
    <>
      <Helmet>
        <title>????????????</title>
        <meta name="description" content="??????????????????"/>
      </Helmet>
      <RestaurantInfo {...sellerData} />
      <Grid container direction="row" style={{ margin: "40px 0" }}>
        <Grid item xs={12} sm={1} />
        <Grid item xs={12} sm={6}>
          <Typography
            style={{ textAlign: "center", marginBottom: 32 }}
            gutterBottom noWrap variant="h5"
          >
          ?????????????????????????????????&nbsp;&nbsp;
          <span role="img" aria-label="burger" style={{ fontSize: 40 }}>
            ????
          </span>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <SearchBar page="items" handleSearch={handleSearch} />
        </Grid>
        <Grid item xs={12} sm={1} />
        <RestaurantItems items={filteredItemsState} />
        <Button className={classes.button} fullWidth onClick={handleOpen}>
          ???????????????
        </Button>
      </Grid>
      <ItemDialog
        open={open} inputs={inputs}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        handleFileSelect={handleFileSelect}
        handleInputChange={handleInputChange}
      />
    </>
  )
}

export default Dashboard
