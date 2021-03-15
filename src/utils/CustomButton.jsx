import React from 'react'
import { Tooltip, IconButton } from '@material-ui/core';

const CustomButton = ({ children, onClick, tip, btnClassName, tipClassName }) => {
  return (
    <Tooltip title={tip} className={tipClassName} placement="bottom">
      <IconButton onClick={onClick} className={btnClassName}>
        {children}
      </IconButton>
    </Tooltip>
  )
}

export default CustomButton
