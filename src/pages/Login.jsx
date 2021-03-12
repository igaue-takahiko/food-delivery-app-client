import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  makeStyles,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core';

import { useForm } from '../hooks/forms';
import { login } from '../redux/auth/actions';

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  title: {
    margin: "10px 0"
  }
}))

const Login = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const { loading, serverError, errors, signUpSuccess } = useSelector(state => state.ui)

  const loginHandle = () => {
    const userData = {
      email: inputs.email,
      password: inputs.password
    }
    dispatch(login(userData, history))
  }

  const { inputs, handleInputChange, handleSubmit } = useForm(
    {
      email: "",
      password: "",
    },
    loginHandle
  )

  let incorrectCredentialsError = null;
  let verifyEmailError = null;
  if (errors) {
    if (errors.includes("一致するメールアドレスとパスワードがありません。")) {
      incorrectCredentialsError = errors
    }
    if (errors.includes("プラットフォームにアクセスする前にメールを確認してください。")) {
      verifyEmailError = errors
    }
  }

  return (
    <Grid container className={classes.form}>
      <Helmet>
        <title>ログイン</title>
        <meta name="description" content="ログイン画面"/>
      </Helmet>
      <Grid item sm />
      <Grid item sm style={{ margin: "48px 0" }}>
        <Typography variant="h3" className={classes.title}>
          Login{" "}
          <span role="img" aria-label="ハンバーガーの絵文字">
            🍔
          </span>
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          {signUpSuccess && (
            <Typography className={classes.customSuccess} variant="body2">
              アカウントが正常に登録されました。<br/>
              ログインする前にメールアドレスを確認してください。
            </Typography>
          )}
          <TextField
            className={classes.textField} id="email" type="email"
            name="email" label="メールアドレス" fullWidth
            value={inputs.email} onChange={handleInputChange}
          />
          <TextField
            className={classes.textField} id="password" type="password"
            name="password" label="パスワード" fullWidth autoComplete="true"
            value={inputs.password} onChange={handleInputChange}
          />
          {serverError && (
            <Typography variant="body2" className={classes.customError}>
            {"サーバーエラー、再試行してください。"}
          </Typography>
          )}
          {verifyEmailError && (
            <Typography variant="body2" className={classes.customError}>
              {verifyEmailError}
            </Typography>
          )}
          {incorrectCredentialsError && (
            <Typography variant="body2" className={classes.customError}>
              {incorrectCredentialsError}
            </Typography>
          )}
          <Button
            className={classes.button}
            color="primary" type="submit"
            variant="contained" disabled={loading}
          >
            ログイン
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br/>
          <Link to="/register">
              <small className={classes.small}>
                アカウントをお持ちでない方はこちら
              </small>
            </Link>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  )
}

export default Login
