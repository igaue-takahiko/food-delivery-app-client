import React from 'react'
import { useDispatch } from 'react-redux';
import { makeStyles, Button, Typography, Paper } from '@material-ui/core';
import { FiberManualRecord } from '@material-ui/icons';
import dayjs from 'dayjs';
import "dayjs/locale/ja"
import relativeTime from 'dayjs/plugin/relativeTime';

import { changeOrderStatus } from '../redux/data/actions';
import SummaryExpansion from './SummaryExpansion';

const useStyles = makeStyles((theme) => ({
  para: {
    fontSize: "x-large",
    marginLeft: "32%",
  },
  title: {
    margin: "20px 0px 10px 260px",
    display: "inline-block",
    marginRight: "40%",
  },
  spaceTypo: {
    display: "flex",
    justifyContent: "space-between",
  },
  address: {
    "& > *": {
      margin: theme.spacing(4),
      width: "25ch",
    },
  },
  red: {
    color: "red",
  },
  green: {
    color: "green",
  },
  buttonCancel: {
    backgroundColor: "#cf0700",
    color: "white",
    marginBottom: 20,
    marginTop: 10,
    marginRight: 10,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
    "&:disabled": {
      backgroundColor: "#5a5c5a",
      color: "white",
    },
  },
  buttonAccept: {
    backgroundColor: "#118a27",
    color: "white",
    marginBottom: 20,
    marginTop: 10,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
  },
}))

const OrderCard = ({ order, role }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  dayjs.extend(relativeTime).locale('ja')

  const handleCancel = () => {
    const body = {
      status: "キャンセル"
    }
    dispatch(changeOrderStatus(order._id, body))
  }

  const handleAccept = () => {
    const body = {
      status: "配達中"
    }
    dispatch(changeOrderStatus(order._id, body))
  }

  const handleDelivery = () => {
    const body = {
      status: "配達済み"
    }
    dispatch(changeOrderStatus(order._id, body))
  }

  const handleCompleted = () => {
    const body = {
      status: "配達完了"
    }
    dispatch(changeOrderStatus(order._id, body))
  }

  return (
    <Paper
      style={{ backgroundColor: "#faf7f7", margin: "20 auto" }}
      elevation={2}
    >
      <div style={{ marginLeft: 16 }}>
        <Typography gutterBottom variant="body1" color="textSecondary">
          ID: #{order._id}
        </Typography>
        <Typography gutterBottom variant="body1" color="textPrimary">
          {role === "ROLE_USER" && `発注元: ${order.seller.name}`}
          {
            role === "ROLE_SELLER" &&
            `注文者: ${order.user.name} 様  電話番号 +81 ${order.user.address.phoneNo}`
          }
        </Typography>
        {role === "ROLE_USER" && (
          <Typography gutterBottom variant="body1" color="textPrimary">
            電話番号: +81 {order.seller.phone}
          </Typography>
        )}
        {role === "ROLE_SELLER" && (
          <Typography>
            住所:{" "}
            {`${order.user.address.locality} ${order.user.address.street} ${order.user.address.aptName}`}
          </Typography>
        )}
        <div style={{ margin: "8px 16px 8px 0" }}>
          <SummaryExpansion condition="Orders" items={order.items} />
        </div>
        <Typography gutterBottom variant="body1" color="textPrimary">
          受注した時間: {dayjs(order.createAt).fromNow()}
        </Typography>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <FiberManualRecord
            className={ order.status === "キャンセル" ? classes.red : classes.green }
            disabled
          />
          <Typography gutterBottom variant="body1" color="textPrimary">
            注文状況 {order.status}
          </Typography>
        </div>
        {role === "ROLE_USER" && order.status === "受注する" && (
          <Button
            className={classes.buttonCancel}
            disabled={order.status !== "受注する"}
            onClick={handleCancel}
          >
            注文をキャンセル
          </Button>
        )}
        {role === "ROLE_SELLER" && order.status === "受注する" && (
          <div style={{ display: "inline-block" }}>
            <Button className={classes.buttonCancel} onClick={handleCancel}>
              キャンセルする
            </Button>
            <Button className={classes.buttonAccept} onClick={handleAccept}>
              受注する
            </Button>
          </div>
        )}
        {role === "ROLE_SELLER" && order.status === "配達中" && (
          <Button className={classes.buttonAccept} onClick={handleDelivery}>
            配達中
          </Button>
        )}
        {role === "ROLE_SELLER" && order.status === "配達済み" && (
          <Button className={classes.buttonAccept} onClick={handleCompleted}>
            配達済み
          </Button>
        )}
        <br/>
      </div>
    </Paper>
  )
}

export default OrderCard
