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

import { fetchRestaurantsByAddress } from '../redux/data/actions';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  rootHome: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "95%",
  },
  rootItems: {
    padding: "2px 4px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    width: "90%",
    backgroundColor: "#f1f1f1",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    position: "relative",
  },
  results: {
    position: "absolute",
    top: "calc(100vh + 60px)",
    margin: "0 auto",
    zIndex: 99,
    width: "60%",
    height: "25%"
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}))

const SearchBar = ({ page, action, handleSearch }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [ address, setAddress ] = useState(localStorage.getItem("location") || "")

  const getUserAddressBy = (lat, long) => {
    const latLng = {
      lat,
      lng: long
    }

    axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    ).then((result) => {
      console.log(result.data);
      if (result.data.results[0].formatted_address === "") {
        localStorage.removeItem("location")
      } else {
        localStorage.setItem(
          "location",
          result.data.results[0].formatted_address
        )
        setAddress(result.data.results[0].formatted_address)
        fetchRestByLocation(latLng)
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  const getBrowserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        getUserAddressBy(position.coords.latitude, position.coords.longitude)
      },
      function (error) {
        alert("ロケーターが拒否されました。アドレスを手動で追加してください。")
      }
    )
  }

  const handleSelect = async (value) => {
    if (value === "") {
      localStorage.removeItem("location")
    } else {
      localStorage.setItem("location", value)
    }
    setAddress(value)

    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])
    if (latLng) {
      localStorage.setItem("latlng", `${latLng.lat}, ${latLng.lng}`)
    }
    fetchRestByLocation(latLng)
  }

  const fetchRestByLocation = (latLng) => {
    dispatch(fetchRestaurantsByAddress(latLng.lat, latLng.lng))
    action(true)
  }

  const handleSearchAction = (e) => {
    handleSearch(e.target.value)
  }

  return (
    <Paper
      className={page !== "items" ? classes.rootHome : classes.rootItems}
      component="form"
    >
      {page === "home" && <LocationOn className={classes.iconButton} />}
      {page === "items" && (
        <InputBase
          className={classes.input}
          placeholder="商品を検索する"
          inputProps={{ "aria-label": "商品を検索する" }}
          onChange={handleSearchAction}
        />
      )}
      {page === "home" && (
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <>
              <InputBase
                className={classes.input}
                {...getInputProps({ placeholder: "検索" })}
                inputProps={{ "aria-label": "配送先の住所をGoogle Mapで検索" }}
              />
              <div className={classes.results}>
                {loading ? <div>Loading...</div> : null}
                {suggestions.map((suggestion, index) => {
                  const style = suggestion.active
                    ? { backgroundColor: "#f8f9fa", cursor: "pointer" }
                    : { backgroundColor: "#fff", cursor: "pointer" }

                  return (
                    <div key={index} {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </PlacesAutocomplete>
      )}
      <Search className={classes.iconButton} />
      {page === "home" && (
        <>
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton
            className={classes.iconButton}
            color="primary" aria-label="directions"
            onClick={getBrowserLocation}
          >
            <MyLocation />
          </IconButton>
        </>
      )}
    </Paper>
  )
}

export default SearchBar
