import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {
  Paper,
  InputBase,
  Divider,
  IconButton,
} from '@material-ui/core';
import { MyLocation, LocationOn, Search } from '@material-ui/icons';

const SearchBar = ({ page }) => {
  return (
    <Paper
      component="form"
    >
      {page === "home" && <LocationOn />}
      {page === "items" && (
        <InputBase
          placeholder="検索"
        />
      )}
    </Paper>
  )
}

export default SearchBar
