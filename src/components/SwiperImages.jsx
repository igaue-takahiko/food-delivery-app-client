import React, { useState } from 'react'
import { makeStyles, useTheme, Button } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import Swiper from 'react-id-swiper';

const useStyles = makeStyles((theme) => ({
  img: {
    height: 240,
    display: "block",
    maxWidth: 400,
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
  buttonLeft: {
    position: "relative",
    top: "-132px",
    left: "-4%",
    color: "white",
  },
  buttonRight: {
    position: "relative",
    top: "-132px",
    right: "-62%",
    color: "white",
  },
  buttonRightRest: {
    right: "-72.5%",
  },
}));

const SwiperImages = ({ images, type }) => {
  const classes = useStyles()
  const theme = useTheme()

  const [ activeStep, setActiveStep ] = useState(0)

  let newImagesArray;
  let maxSteps;

  newImagesArray = images.map((image) => {
    const imageUrlSplit = image.split("\\")
    const imageUrl = imageUrlSplit[0]
    return `../${imageUrl}`
  })
  maxSteps = newImagesArray.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

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
      <div style={{ margin: "40px auto 24px auto" }}>
        <Swiper {...params}>
          {newImagesArray.map((step, index) => (
            <div key={step}>
              {Math.abs(activeStep - index) <= 2 ? (
                <img
                  className={type === "home" ? classes.img : classes.imgRest}
                  src={step} alt={step}
                />
              ) : null}
            </div>
          ))}
        </Swiper>
      </div>
    </>
  )
}

export default SwiperImages
