import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { KeyboardBackspace } from '@material-ui/icons';
import {
  makeStyles,
  Typography,
  Paper,
  Button,
  TextField,
  Grid,
} from '@material-ui/core';

import { getCart, fetchAddress } from '../redux/data/actions';

import { useForm } from '../hooks/forms';
import Spinner from '../utils/spinner/Spinner';
import { CartItem } from '../components';

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  title: {
    margin: "40px auto",
  },
  spaceTypo: {
    display: "flex",
    justifyContent: "space-between"
  },
  address: {
    "& > *": {
      margin: theme.spacing(4),
      width: "25ch",
    },
  },
  goToBackButton: {
    backgroundColor: "#157a21",
    color: "white",
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
  },
  checkoutButton: {
    backgroundColor: "#157a21",
    color: "white",
    marginBottom: 24,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
    "&:disabled": {
      color: "#bfbfbf",
    },
  }
}))

const Cart = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const { loading, cart, price } = useSelector(state => state.data)
  const { errors } = useSelector(state => state.ui)

  const [ step, setStep ] = useState(1)

  useEffect(() => {
    dispatch(getCart())
  },[dispatch])

  let deliveryCharge = 0
  let cartPresent = Array.isArray(cart) && cart.length > 0
  let cartItems = cartPresent ? cart.length : 0

  if (price !== 0) {
    deliveryCharge = 200
  }

  //バリデーション
  let streetError = null;
  let localityError = null;
  let zipError = null;
  let aptError = null;
  let phoneNoError = null;

  if (errors) {
    for (const error of errors) {
      if (error.msg.includes("都道府県の入力は必須です。")) {
        localityError = error.msg
      }
      if (error.msg.includes("住所の入力は必須です。")) {
        streetError = error.msg
      }
      if (error.msg.includes("郵便番号の入力は必須です。")) {
        zipError = error.msg
      }
      if (error.msg.includes("電話番号の入力は必須です。")) {
        phoneNoError = error.msg
      }
    }
  }

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handlePlaceOrder = () => {
    const userData = {
      street: inputs.street,
      aptName: inputs.aptName,
      locality: inputs.locality,
      zip: inputs.zip,
      phoneNo: inputs.phoneNo,
    }
    dispatch(fetchAddress(userData, history))
  }

  const { inputs, handleInputChange } = useForm({
    street:
    props.location.state.address != null &&
      // eslint-disable-next-line
    props.location.state.address != undefined
      ? props.location.state.address.street
      : "",
    locality:
    props.location.state.address !== null &&
    // eslint-disable-next-line
    props.location.state.address !== undefined
    ? props.location.state.address.locality
    : "",
    aptName:
    props.location.state.address !== null &&
    // eslint-disable-next-line
    props.location.state.address !== undefined
    ? props.location.state.address.aptName
    : "",
    zip:
    props.location.state.address !== null &&
    // eslint-disable-next-line
    props.location.state.address !== undefined
    ? props.location.state.address.zip
    : "",
    phoneNo:
    props.location.state.address !== null &&
    // eslint-disable-next-line
    props.location.state.address !== undefined
    ? props.location.state.address.phoneNo
    : "",
  })

  return (
    <>
      <Helmet>
        <title>カート</title>
        <meta name="description" content="カート画面"/>
      </Helmet>
      {loading ? (
        <Spinner />
      ) : (
        < >
          <Typography className={classes.title} variant="h4" style={{ textAlign: "center" }}>
            {step === 1 && `カートの中身は ${cartItems}個`}
            {step === 2 && "住所の登録"}
          </Typography>
          {step === 2 && (
            <div style={{ marginLeft: "8%" }}>
              <Button
                className={classes.goToBackButton} variant="contained"
                onClick={prevStep}
              >
                <KeyboardBackspace />
                {"  戻る"}
              </Button>
            </div>
          )}
          <Grid container direction="row" spacing={2}>
            <Grid item sm={1}/>
            <Grid item sm={7}>
              {cartPresent &&
                step === 1 &&
                cart.map((item) => (
                <CartItem {...item} key={item.itemId._id}/>
              ))}
              {step === 2 && (
                <form>
                  <Typography
                    style={{ margin: "8px 8px 4px 8px" }}
                    variant="body2"
                  >
                    住所:
                  </Typography>
                  <div className={classes.address}>
                    <TextField
                      className={classes.textField} id="zip" type="number"
                      name="zip" label="郵便番号" fullWidth required
                      error={zipError ? true : false} helperText={zipError}
                      value={inputs.zip} onChange={handleInputChange}
                    />
                    <TextField
                      className={classes.textField} id="locality"
                      name="locality" label="都道府県" fullWidth required
                      error={localityError ? true : false} helperText={localityError}
                      value={inputs.locality} onChange={handleInputChange}
                    />
                    <TextField
                      className={classes.textField} id="street"
                      name="street" label="住所" fullWidth required
                      error={streetError ? true : false} helperText={streetError}
                      value={inputs.street} onChange={handleInputChange}
                    />
                    <TextField
                      className={classes.textField} id="aptName"
                      name="aptName" label="マンション、ビル名など" fullWidth
                      error={aptError ? true : false} helperText={aptError}
                      value={inputs.aptName} onChange={handleInputChange}
                    />
                    <TextField
                      className={classes.textField} id="phoneNo"
                      name="phoneNo" label="電話番号" fullWidth required
                      error={phoneNoError ? true : false} helperText={phoneNoError}
                      value={inputs.phoneNo} onChange={handleInputChange}
                    />
                  </div>
                </form>
              )}
            </Grid>
            <Grid item xs={9} sm={3} style={{ margin: "0 auto" }}>
              <Paper
                className={classes.paper}
                style={{ backgroundColor: "#faf7f7" }}
                elevation={3}
              >
                <div style={{ margin: "0 18px" }}>
                  <br/>
                  <Typography gutterBottom variant="h5" noWrap style={{ textAlign: "center" }}>
                    {step === 1 && "合計金額"}
                    {step === 2 && "注文の概要"}
                  </Typography>
                  <br/>
                  <br/>
                  {step === 1 && (
                    <Typography
                      className={classes.spaceTypo}
                      variant="body2" color="textPrimary"
                    >
                      <span>商品合計</span>
                      <span>{`¥ ${price.toLocaleString()}`}</span>
                    </Typography>
                  )}
                  <br/>
                  {step === 2 && cart.map((item) => (
                    <Typography
                      className={classes.spaceTypo}
                      key={item.itemId._id}
                      color="textPrimary" variant="body2"
                    >
                      <span>
                        {item.itemId.title}
                      </span>
                      <span>
                        {`¥ ${item.itemId.price.toLocaleString()} × ${item.quantity}`}
                      </span>
                    </Typography>
                  ))}
                  <Typography
                    className={classes.spaceTypo}
                    variant="body2" color="textPrimary"
                  >
                    <span>配達料</span>
                    <span>{`¥ ${deliveryCharge.toLocaleString()}`}</span>
                  </Typography>
                  <hr/>
                  <Typography gutterBottom variant="h6" noWrap>
                    <div className={classes.spaceTypo}>
                      <span>
                        総合計
                      </span>
                      <span>
                        {`¥ ${(price + deliveryCharge).toLocaleString()}`}
                      </span>
                    </div>
                    <br/>
                  </Typography>
                  {step === 1 && (
                    <Button
                      className={classes.checkoutButton}
                      disabled={price === 0} fullWidth
                      onClick={nextStep}
                    >
                      支払いに進む
                    </Button>
                  )}
                  {step === 2 && (
                    <Button
                      className={classes.checkoutButton}
                      fullWidth
                      onClick={handlePlaceOrder}
                    >
                      注文をする
                    </Button>
                  )}
                </div>
              </Paper>
            </Grid>
            <Grid item sm={1} />
          </Grid>
        </>
      )}
    </>
  )
}

export default Cart
