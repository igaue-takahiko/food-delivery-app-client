import React from 'react'
import { makeStyles } from '@material-ui/core';
import Swiper from 'react-id-swiper';

const useStyles = makeStyles((theme) => ({
  img: {
    height: 240,
    display: "block",
    overflow: "hidden",
    width: "100%",
  },
  imgRest: {
    height: 360,
    display: "block",
    maxWidth: 500,
    overflow: "hidden",
    width: "100%",
    borderRadius: "5%",
  },
}));

const SwiperImages = ({ images, type }) => {
  const classes = useStyles()

  let newImagesArray;

  newImagesArray = images.map((image) => {
    const imageUrlSplit = image.split("\\")
    const imageUrl = imageUrlSplit[0]
    return `${process.env.REACT_APP_SERVER_URL}/${imageUrl}`
  })

  const params = {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  }

  return (
    <>
      <div style={{ margin: "0px auto 24px auto" }}>
        <Swiper {...params}>
          {newImagesArray.map((step, index) => (
            <div key={step}>
              <img
                className={type === "home" ? classes.img : classes.imgRest}
                src={step} alt={step}
              />
            </div>
          ))}
        </Swiper>
      </div>
    </>
  )
}

export default SwiperImages
