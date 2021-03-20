import React from 'react'
import { ExpandMore } from '@material-ui/icons';
import {
  makeStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  spaceTypo: {
    display: "flex",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  ...theme.spreadThis,
}));

const SummaryExpansion = ({ condition, items }) => {
  const classes = useStyles()

  let Items
  let totalPrice = 0
  if (condition === "Orders") {
    Items = items
    Items.forEach((item) => {
      totalPrice = totalPrice + item.quantity * item.item.price
    })
  }

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          className={classes.backgroundColorChange}
          id="panel1a-header" aria-controls="panel1a-content"
          expandIcon={<ExpandMore />}
        >
          <Typography className={classes.heading}>
            {condition === "Orders" && "注文概要"}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {condition === "Orders" && (
            <>
            {Items.map((item) => (
                <Typography
                  variant="body2"
                  color="textPrimary"
                  key={item.item._id}
                >
                  {item.item.title}&nbsp;&nbsp;
                  <br/>
                  {`¥ ${item.item.price} × ${item.quantity}`}&nbsp;&nbsp;
                  <br/>
                </Typography>
            ))}
                <Typography variant="h5" className={classes.heading}>
                &nbsp;&nbsp;合計: ¥ {totalPrice}
                </Typography>
            </>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default SummaryExpansion
