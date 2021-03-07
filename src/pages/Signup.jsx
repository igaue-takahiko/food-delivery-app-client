import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  makeStyles,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress
} from '@material-ui/core';

import { signupUser } from '../redux/auth/actions';
import { useForm } from '../hooks/forms';

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  title: {
    margin: "48px 0 8px 0"
  }
}))

const Signup = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const { loading, serverError, errors } = useSelector((state) => state);

  const signupHandle = (props) => {
    const newUserData = {
      email: inputs.email,
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      role: "ROLE_USER",
      password: inputs.password,
      confirmPassword: inputs.confirmPassword
    }
    dispatch(signupUser(newUserData, history))
  }

  const { inputs, handleInputChange, handleSubmit } = useForm(
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    signupHandle
  )

  let emailError = null;
  let passwordError = null;
  let confirmPasswordError = null;
  let firstNameEmptyError = null;
  let lastNameEmptyError = null;

  if (errors) {
    if (typeof errors !== "string") {
      for (let i = 0; i < errors.length; i++) {
        if (errors[i].msg.includes("First Name"))
          firstNameEmptyError = errors[i].msg;
        if (errors[i].msg.includes("Last Name"))
          lastNameEmptyError = errors[i].msg;
        if (errors[i].msg.includes("valid email")) emailError = errors[i].msg;
        if (errors[i].msg.includes("Email address already"))
          emailError = errors[i].msg;
        if (errors[i].msg.includes("least 6 characters long"))
          passwordError = errors[i].msg;
        if (errors[i].msg.includes("Passwords have to"))
          confirmPasswordError = errors[i].msg;
      }
    }
  }

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant="h3" className={classes.title}>
          Register{" "}
          <span role="img" aria-label="Pizza Emoji">
            🍕
          </span>
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            className={classes.textField} id="firstName"
            name="firstName" label="名字" fullWidth required
            helperText={firstNameEmptyError}
            error={firstNameEmptyError ? true : false}
            value={inputs.firstName} onChange={handleInputChange}
          />
          <TextField
            className={classes.textField} id="lastName"
            name="lastName" label="名前" fullWidth required
            helperText={lastNameEmptyError}
            error={lastNameEmptyError ? true : false}
            value={inputs.lastName} onChange={handleInputChange}
          />
          <TextField
            className={classes.textField} id="email"
            name="email" label="メールアドレス" fullWidth required
            helperText={emailError}
            error={emailError ? true : false}
            value={inputs.email} onChange={handleInputChange}
          />
          <TextField
            className={classes.textField} id="password"
            name="password" label="パスワード(半角英数6文字以上)" fullWidth required
            helperText={passwordError}
            error={passwordError ? true : false}
            value={inputs.password} onChange={handleInputChange}
          />
          <TextField
            className={classes.textField} id="confirmPassword"
            name="confirmPassword" label="確認用パスワード" fullWidth required
            helperText={passwordError ? passwordError: confirmPasswordError}
            error={passwordError ? true : confirmPasswordError ? true : false}
            value={inputs.firstName} onChange={handleInputChange}
          />
          {serverError && (
            <Typography variant="body2" className={classes.customError}>
              {"サーバーエラー、再試行してください。"}
            </Typography>
          )}
          <Button
            className={classes.button}
            color="primary" type="submit"
            disabled={loading} variant="contained"
          >
            登録する
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br/>
            <Link to="/login">
              <small className={classes.small}>
                アカウントをお持ちに方はこちら
              </small>
            </Link>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  )
}

export default Signup
