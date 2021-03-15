import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  makeStyles,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
  CircularProgress
} from '@material-ui/core';

import { useForm } from '../hooks/forms';
import { signupSeller } from '../redux/user/actions';

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  root: {
    flexGrow: 1,
    marginTop: 40
  },
  paper: {
    padding: theme.spacing(2),
  },
  address: {
    "& > *": {
      padding: "0 6px",
      width: "25ch",
    },
  },
}))

const AddRestaurant = () => {
  const classes = useStyles()
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, serverError, errorsSeller } = useSelector(state => state.ui)

  const [ images, setImages ] = useState({});

  const { message, errors } = errorsSeller || {}

  let imageError

  if (message) {
    if (message.includes("画像をアップロードしてください。")) {
      imageError = message
    }
  }

  const handleFileSelect = (e) => {
    setImages(e.target.files)
  }

  //エラーバリデーション
  let emailError = null;
  let passwordError = null;
  let confirmPasswordError = null;
  let streetError = null;
  let aptError = null;
  let localityError = null;
  let zipError = null;
  let phoneNoError = null;
  let nameError = null;
  let tagsError = null;
  let costForOneError = null;
  let minOrderError = null;
  let paymentError = null;

  if (errors) {
    for (const error of errors) {
      if (error.msg.includes("有効なメールアドレスを入力してください。")) {
        emailError = error.msg
      }
      if (error.msg.includes("すでにそのメールアドレスは使われています。")) {
        emailError = error.msg
      }
      if (error.msg.includes("パスワードは６文字以上の入力でお願いします。")) {
        passwordError = error.msg
      }
      if (error.msg.includes("確認用パスワードが一致していません。")) {
        confirmPasswordError = error.msg
      }
      if (error.msg.includes("電話番号の入力は必須です。")) {
        phoneNoError = error.msg
      }
      if (error.msg.includes("最小注文額の注文は必須です。")) {
        minOrderError = error.msg;
      }
      if (error.msg.includes("コストの入力は必須です。")) {
        costForOneError = error.msg;
      }
      if (error.msg.includes("郵便番号の入力は必須です。")) {
        zipError = error.msg;
      }
      if (error.msg.includes("都道府県の入力は必須です。")) {
        localityError = error.msg;
      }
      if (error.msg.includes("住所の入力は必須です。")) {
        streetError = error.msg;
      }
      if (error.msg.includes("ジャンルの入力は必須です。")) {
        tagsError = error.msg;
      }
      if (error.msg.includes("支払いの入力は必須です。")) {
        paymentError = error.msg;
      }
      if (error.msg.includes("店舗名の入力は必須です。")) {
        nameError = error.msg;
      }
    }
  }

  const signupSellerHandle = () => {
    const formData = new FormData()
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i])
    }
    formData.append("name", inputs.name)
    formData.append("email", inputs.email)
    formData.append("tags", inputs.tags)
    formData.append("costForOne", inputs.costForOne)
    formData.append("minOrderAmount", inputs.minOrderAmount);
    formData.append("street", inputs.street);
    formData.append("aptName", inputs.aptName);
    formData.append("locality", inputs.locality);
    formData.append("zip", inputs.zip);
    formData.append("phoneNo", inputs.phoneNo);
    formData.append("password", inputs.password);
    formData.append("confirmPassword", inputs.confirmPassword);
    formData.append("payment", inputs.payment);
    formData.append("role", "ROLE_SELLER");
    dispatch(signupSeller(formData, history));
  }

  const { inputs, handleInputChange, handleSubmit } = useForm(
    {
      name: "",
      email: "",
      tags: "",
      costForOne: "",
      minOrderAmount: "",
      street: "",
      aptName: "",
      locality: "",
      zip: "",
      phoneNo: "",
      payment: "",
      password: "",
      confirmPassword: "",
    },
    signupSellerHandle
  )

  return (
    <div className={classes.root}>
      <Helmet>
        <title>店舗登録</title>
        <meta name="description" content="店舗登録画面"/>
      </Helmet>
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10} sm={5}  style={{ marginBottom: 24 }}>
          <Paper className={classes.paper} elevation={2}>
            <Typography
              className={classes.pageTitle}
              variant="h5"
              style={{ textAlign: "center" }}
            >
              お店の登録
            </Typography>
            <form noValidate onSubmit={handleSubmit}>
              <Typography
                variant="body1"
                component="p"
                style={{ margin: "10px 10px 2px 10px" }}
              >
                基本情報
              </Typography>
              <TextField
                className={classes.textField} id="restName" label="店舗名"
                name="name" placeholder="" helperText={nameError}
                error={nameError ? true : false} fullWidth required
                value={inputs.name} onChange={handleInputChange}
              />
              <TextField
                className={classes.textField} id="email" label="お店のメールアドレス"
                name="email" placeholder="あなたのお店のメールアドレス" helperText={emailError}
                error={emailError ? true : false} fullWidth required
                value={inputs.email} onChange={handleInputChange}
              />
              <TextField
                className={classes.textField} id="tags" label="お店のジャンル"
                name="tags" placeholder="" helperText={tagsError}
                error={tagsError ? true : false} fullWidth required
                value={inputs.tags} onChange={handleInputChange}
              />
              <TextField
                className={classes.textField} id="costForOne" label="配達料"
                name="costForOne" placeholder="最低限の一回分の費用" helperText={costForOneError}
                error={costForOneError ? true : false} fullWidth required type="number"
                value={inputs.costForOne} onChange={handleInputChange}
              />
              <TextField
                className={classes.textField} id="minOrderAmount" label="注文の最低額"
                name="minOrderAmount" placeholder="" helperText={minOrderError}
                error={minOrderError ? true : false} fullWidth required type="number"
                value={inputs.minOrderAmount} onChange={handleInputChange}
              />
              <Typography
                variant="body2" component="p"
                style={{ margin: "16px 10px 0 10px" }}
              >
                住所:
              </Typography>
              <div className={classes.address}>
              <TextField
                className={classes.textField} id="zipCode" label="郵便番号"
                name="zip" placeholder="" helperText={zipError} type="number"
                error={zipError ? true : false} fullWidth required
                value={inputs.zip} onChange={handleInputChange}
              />
              <TextField
                className={classes.textField} id="locality" label="都道府県"
                name="locality" placeholder="" helperText={localityError}
                error={localityError ? true : false} fullWidth required
                value={inputs.locality} onChange={handleInputChange}
              />
              <TextField
                className={classes.textField} id="street" label="住所"
                name="street" placeholder="" helperText={streetError}
                error={streetError ? true : false} fullWidth required
                value={inputs.street} onChange={handleInputChange}
              />
              <TextField
                className={classes.textField} id="aptName" label="マンション、ビル名など"
                name="aptName" placeholder="" helperText={aptError}
                error={aptError ? true : false} fullWidth required
                value={inputs.aptName} onChange={handleInputChange}
              />
              <TextField
                className={classes.textField} id="phoneNo" label="電話番号"
                name="phoneNo" placeholder="" helperText={phoneNoError}
                error={phoneNoError ? true : false} fullWidth required
                value={inputs.phoneNo} onChange={handleInputChange}
              />
              </div>
              <TextField
                className={classes.textField} id="payment" label="支払い方法"
                name="payment" placeholder="現金、クレジットのどちらか" helperText={paymentError}
                error={paymentError ? true : false} fullWidth required
                value={inputs.payment} onChange={handleInputChange}
              />
              <Typography
                variant="body2" component="p"
                style={{ margin: "10px 10px 2px 10px" }}
              >
                お店のイメージ画像:
              </Typography>
              <input
                className={classes.uploadImages} id="raised-button-file"
                type="file" accept="image/*" multiple onChange={handleFileSelect}
              />
              {imageError && (
                <Typography
                  style={{ margin: "4px 10px 2px 10px", color: "#f44336" }}
                  variant="body2" component="p"
                >
                  画像をアップロードして下さい。
                </Typography>
              )}
              <TextField
                className={classes.textField} id="password" label="パスワード(半角英数６文字以上)"
                name="password" placeholder="" helperText={passwordError}
                error={passwordError ? true : false} fullWidth required type="password"
                value={inputs.password} onChange={handleInputChange} autoComplete="false"
              />
              <TextField
                className={classes.textField} id="confirmPassword" label="確認用パスワード"
                name="confirmPassword" placeholder=""
                helperText={passwordError ? passwordError : confirmPasswordError}
                error={passwordError ? true : confirmPasswordError ? true : false}
                fullWidth required type="password" autoComplete="false"
                value={inputs.confirmPassword} onChange={handleInputChange}
              />
              {serverError && (
                <Typography variant="body2" className={classes.customError}>
                  {"サーバーエラーがありました。再度試して下さい。"}
                </Typography>
              )}
              <Button
                className={classes.button} type="submit" color="primary"
                disabled={loading} fullWidth variant="contained"
              >
                登録する
                {loading && (
                  <CircularProgress className={classes.progress} size={30} />
                )}
              </Button>
              <br/>
              <span
                className={classes.small}
                style={{ textAlign: "center" }}
              >
                DeliveryHubと提携して、ビジネスを拡大しましょう!
              </span>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={10} sm={4} style={{ marginLeft: 32 }}>
          <Paper
            className={classes.paper}
            style={{ backgroundColor: "#f1f1f1" }}
            elevation={2}
          >
            <Typography
              gutterBottom
              variant="h6"
              noWrap
              style={{ textAlign: "center" }}
            >
              わずか3ステップで始めましょう!
              <br />
              <br />
            </Typography>
            <Typography
              variant="body2"
              color="textPrimary"
              style={{ marginLeft: "30px", fontSize: "16px" }}
            >
              1. あなたのお店について教えてください。 <br />
              2. あなたのメールアドレスを登録して下さい。<br />
              3. お店様用ダッシュボードにアクセスして移動！
              <br />
              <br />
              <br />
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </div>
  )
}

export default AddRestaurant
