import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles, Grid, Typography, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#e8ede1",
    marginTop: 72,
    textAlign: "center",
  },
  innerCont: {
    margin: "74px 40px 40px 40px",
  },
  resources: {
    margin: "80px 40px 10px 40px",
  },
  buttonStyleOne: {
    height: 40,
    color: "white",
    backgroundColor: theme.palette.primary.main,
    fontSize: 16,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
  },
  buttonStyleTwo: {
    height: 40,
    color: "white",
    backgroundColor: theme.palette.primary.main,
    marginLeft: 16,
    marginTop: 8,
    fontSize: 16,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
  }
}))

const Footer = () => {
  const classes = useStyles()
  const { authenticated } = useSelector(state => state.user)

  return (
    <Grid className={classes.container} container direction="row">
      <Grid className={classes.innerCont} item xs={12} sm={4}>
        {authenticated ? (
          <Grid container direction="row">
            <Grid item xs={12} sm={6} style={{ marginBottom: 16 }}>
              <Typography variant="h5" component="p">
                Company
              </Typography>
              <Typography variant="body1" component="p">
                <br />
                - 会社概要 <br />
                - ブログ <br />
                - 採用概要 <br />
                - お問い合わせ <br />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" component="p">
                For You
              </Typography>
              <Typography variant="body1" component="p">
                <br />
                - プライバシー <br />
                - 利用条項 <br />
                - セキュリティ <br />
                - サイトマップ <br />
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <>
            <Typography variant="h4" component="p" style={{ marginBottom: 24 }}>
              DeliveryHub for Business
            </Typography>
            <Typography variant="body1" component="p" style={{ marginBottom: 24 }}>
              何をするかにフォーカスを失うことなく、<br/>
              あなたのビジネスから多くのものを得る<br/>
              最も重要なことは、お客様を喜ばせることです。
            </Typography>
            <p style={{ marginBottom: 16 }}>店舗登録のは方はこちら</p>
            <Link to="/add-restaurant">
              <Button className={classes.buttonStyleOne}>Get Started</Button>
            </Link>
          </>
        )}
      </Grid>
      <Grid item xs={12} sm={3} className={classes.innerCont}>
        <Typography variant="h5" component="p" style={{ marginBottom: 24 }}>
          DeliveryHub News
        </Typography>
        <Typography variant="body1" component="p" style={{ marginBottom: 8 }}>
          お問い合わせしていただければ、<br/>
          最新情報を送信いたします。
        </Typography>
        <TextField label="メールアドレス" variant="outlined" />
        <Button className={classes.buttonStyleTwo}>
          送信
        </Button>
      </Grid>
      <Grid item xs={12} sm={3} className={classes.resources}>
        <Typography variant="h5" component="p">
          使用した技術スタック
        </Typography>
        <Typography variant="body1" component="p" style={{ marginBottom: 32 }}>
          - React Redux <br />
          - Material UI <br/>
          - NodeJs <br />
          - Express <br />
          - MongoDB Atlas <br />
          - Google Map geocoding <br/>
          - Google Map places <br/>
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Footer
