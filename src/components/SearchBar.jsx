import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {
  Paper,
  InputBase,
  Divider,
  IconButton,
  makeStyles
} from '@material-ui/core';
import { MyLocation, LocationOn, Search } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  rootHome: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "30rem",
  },
  rootItems: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    backgroundColor: "#edebeb",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    position: "relative",
  },
  results: {
    position: "absolute",
    bottom: -166,
    left: "26%",
    zIndex: 999,
    width: 760,
    height: "15%"
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}))

const SearchBar = ({ page, action }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  return (
    <Paper
      className={page !== "items" ? classes.rootHome : classes.rootItems}
      component="form"
    >
      {page === "home" && <LocationOn className={classes.iconButton} />}
      {page === "items" && (
        <InputBase
          className={classes.input}
          placeholder="検索"
          inputProps={{ "aria-label": "search for items" }}
        />
      )}
      {/* {page === "home" && (
        <PlacesAutocomplete>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <>
              <InputBase />
              <div className={classes.results}>
                {loading ? <div>Loading...</div> : null}
                {suggestions.map((suggestion) => {
                  const style = suggestion.active
                    ? { backgroundColor: "#41b6e6", cursor: "pointer" }
                    : { backgroundColor: "#fff", cursor: "pointer" }

                  return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </PlacesAutocomplete>
      )} */}
      <Search className={classes.iconButton} />
      {page === "home" && (
        <div>
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton
            className={classes.iconButton}
            color="primary" aria-label="directions"
          >
            <MyLocation />
          </IconButton>
        </div>
      )}
    </Paper>
  )
}

export default SearchBar
