import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import openSocket from 'socket.io-client';

import { getOrders, socketStatusUpdate } from '../redux/data/actions';
import { OrderCard } from '../components';

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  para: {
    fontSize: "x-large",
    margin: "80px auto"
  },
  title: {
    textAlign: "center",
    margin: "32px 0"
  }
}))

const Orders = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { account: { role }, _id } = useSelector(state => state.user)
  const { orders } = useSelector(state => state.data)

  useEffect(() => {
    dispatch(getOrders())
    const socket = openSocket(process.env.REACT_APP_SERVER_URL)
    socket.emit("add-user", { userId: _id })
    socket.on("orders", (data) => {
      if (data.action === "update") {
        dispatch(socketStatusUpdate(data.order))
      }

      if (data.action === "create") {
        dispatch(getOrders())
      }
    })
  },[_id, dispatch])

  return (
    <div style={{ margin: "80px 0" }}>
      <Helmet>
        <title>注文履歴</title>
        <meta name="description" content="注文履歴画面"/>
      </Helmet>
      <Typography className={classes.title} variant="h5">
        注文履歴
      </Typography>
      <Grid container direction="row">
        <Grid item xs={12} sm={1} />
        <Grid item xs={12} sm={10}>
          <Grid container spacing={2}>
            {orders ? (
              orders.length > 0 ? (
                orders.map((order) => (
                  <Grid item xs={12} sm={4} key={order._id}>
                    <OrderCard order={order} role={role} />
                  </Grid>
                ))
              ) : (
                <p className={classes.para}>
                  注文がありません。
                </p>
              )
            ) : null}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={1} />
      </Grid>
    </div>
  )
}

export default Orders
