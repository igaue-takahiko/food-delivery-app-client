import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Typography, Grid } from '@material-ui/core';

import { fetchRestaurant } from '../redux/data/actions';

import { RestaurantInfo, RestaurantItems, SearchBar } from '../components';
import Spinner from '../utils/spinner/Spinner';

const Restaurant = (props) => {
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.data)
  const restaurant = useSelector(state => state.data.restaurant)
  const { items } = useSelector(state => state.data.restaurant)
  const restId = props.location.state.restId

  const [ itemsState, setItemsState ] = useState(items ? [] : null)
  const [ filteredItemsState, setFilteredItemsState ] = useState(items ? [] : null)

  useEffect(() => {
    if (items) {
      setItemsState(items)
      setFilteredItemsState(items)
    }
  },[items])

  useEffect(() => {
    dispatch(fetchRestaurant(restId))
  },[dispatch, restId])

  const handleSearch = (value) => {
    //リストの元の状態を保持する変数
    let currentList = []
    //フィルタリングされたリストを保持する変数
    let newList = []

    if (value !== "") {
      currentList = itemsState
      newList = currentList.filter((item) => {
        const lc = item.title.toLowerCase()
        const filer = value.toLowerCase()
        return lc.includes(filer)
      })
    } else {
      //検索バーが空の場合は、newListを元のタスクリストに設定します
      newList = itemsState
    }
    //ルールがnewListに追加した内容に基づいて、フィルター処理された状態を設定します
    setFilteredItemsState(newList)
  }

  return (
    <div>
      <Helmet>
        <title>店舗詳細</title>
        <meta name="description" content="店舗詳細画面"/>
      </Helmet>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <RestaurantInfo {...restaurant} />
          <Grid container direction="row" style={{ padding: 8 }}>
            <Grid item xs={12} sm={6} style={{ alignItems: "center" }}>
              <Typography gutterBottom variant="h5" style={{ textAlign: "center" }}>
                あなたの注文をお待ちしています。&nbsp;&nbsp;
                <span role="img" aria-label="fries" style={{ fontSize: 40 }}>
                  🍟
                </span>
              </Typography>
              <Typography variant="body1" style={{ textAlign: "center" }} >
                豊富なラインナップの中からお好きなものをお選びください。
              </Typography>
              <br/>
            </Grid>
            <Grid item xs={12} sm={4} style={{ margin: "24px auto", padding: "0 0px" }}>
              <SearchBar page="items" handleSearch={handleSearch} />
            </Grid>
            <RestaurantItems items={filteredItemsState} />
          </Grid>
        </>
      )}
    </div>
  )
}

export default Restaurant
