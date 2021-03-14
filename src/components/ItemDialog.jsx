import React from 'react'
import { useSelector } from 'react-redux';
import {
  makeStyles,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  button: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    width: "40%",
    margin: "40px 0 0 30%",
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
  },
}))

const ItemDialog = ({
  open,
  handleClose,
  inputs,
  handleSubmit,
  handleFileSelect,
  handleInputChange
}) => {
  const classes = useStyles()
  const { errors } = useSelector(state => state.ui)

  const { message, errors: errorsItem } = errors || {}

  let imageError;
  let titleError;
  let descError;
  let priceError;

  if (message) {
    if (message.includes("画像をアップロードしてください。")) {
      imageError = message
    }
  }

  if (errorsItem) {
    for (const error of errorsItem) {
      if (error.msg.includes("タイトルは入力は必須です。")) {
        titleError = error.msg
      }
      if (error.msg.includes("商品説明の入力は必須です。")) {
        descError = error.msg
      }
      if (error.msg.includes("価格の入力は必須です。")) {
        priceError = error.msg
      }
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>商品詳細を入力してください。</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            className={classes.textField} label="商品名"
            name="title" placeholder="" helperText={titleError}
            error={titleError ? true : false} fullWidth type="text"
            value={inputs.title} onChange={handleInputChange}
          />
          <TextField
            className={classes.textField} label="商品の詳細説明"
            name="description" placeholder="" helperText={descError}
            error={descError ? true : false} fullWidth type="text"
            value={inputs.description} onChange={handleInputChange}
          />
          <TextField
            className={classes.textField} label="価格"
            name="price" placeholder="" helperText={priceError}
            error={priceError ? true : false} fullWidth type="number"
            value={inputs.price} onChange={handleInputChange}
          />
          <Typography
            style={{ margin: "10px 10px 2px 10px" }}
            variant="body2" component="p"
          >
            イメージ画像を選択して下さい。
          </Typography>
          <input
            className={classes.updateImages} type="file" accept="image/*"
            id="raised-button-file" onChange={handleFileSelect}
          />
          {imageError && (
            <Typography
              style={{ margin: "4px 10px 2px 10px", color: "#f44336" }}
              variant="body2" component="p"
            >
              画像もアップロードしてください。
            </Typography>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: "#c70f02" }}>
          キャンセル
        </Button>
        <Button onClick={handleSubmit} color="primary">
          送信
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ItemDialog
