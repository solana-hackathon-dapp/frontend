import React, { useState } from 'react'
import { Typography } from 'antd'
import RoundCard from './roundCard.js'

// Carasouel
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import './Slider.css'

const { Text } = Typography

class CustomSlider extends React.Component {
  state = { additionalTransfrom: 0 }

  render () {
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
    }

    const CustomSlider = ({ carouselState }) => {
      let value = 0
      let carouselItemWidth = 0
      if (this.Carousel) {
        carouselItemWidth = this.Carousel.state.itemWidth
        const maxTranslateX = Math.round(
          // so that we don't over-slide
          carouselItemWidth *
            (this.Carousel.state.totalItems -
              this.Carousel.state.slidesToShow) +
            5
        )
        value = maxTranslateX / 100 // calculate the unit of transform for the slider
      }
      const { transform, currentSlide } = carouselState
      return (
        <div className='custom-slider'>
          <input
            type='range'
            value={Math.round(Math.abs(transform) / value)}
            defaultValue={0}
            max={
              (carouselItemWidth *
                (carouselState.totalItems - carouselState.slidesToShow) +
                (this.state.additionalTransfrom === 5 ? 0 : 5)) /
              value
            }
            onChange={e => {
              if (this.Carousel.isAnimationAllowed) {
                this.Carousel.isAnimationAllowed = false
              }
              const nextTransform = e.target.value * value
              const nextSlide = Math.round(nextTransform / carouselItemWidth)
              if (e.target.value == 0 && this.state.additionalTransfrom === 5) {
                this.Carousel.isAnimationAllowed = true
                this.setState({ additionalTransfrom: 0 })
              }
              this.Carousel.setState({
                transform: -nextTransform, // padding 20px and 5 items.
                currentSlide: nextSlide
              })
            }}
            className='custom-slider__input'
          />
        </div>
      )
    }

    const rounds = this.props.rounds
    let roundArray = Object.values(rounds)
    var roundsData = []
    for (var index = 0; index < roundArray.length; index++) {
      if (roundArray[index].epoch > roundArray.length - 7) {
        roundsData.push(roundArray[index])
      }
    }

    return (
      <>
        <Carousel
          ssr={true}
          ref={el => (this.Carousel = el)}
          partialVisible={false}
          customButtonGroup={<CustomSlider />}
          autoPlay={false}
          focusOnSelect={true}
          centerMode={true}
          itemClass='image-item'
          itemAriaLabel='Image-aria-label'
          responsive={responsive}
          containerClass='carousel-container-with-scrollbar'
          additionalTransfrom={-this.state.additionalTransfrom}
          beforeChange={nextSlide => {
            if (nextSlide !== 0 && this.state.additionalTransfrom !== 5) {
              this.setState({ additionalTransfrom: 5 })
            }
            if (nextSlide === 0 && this.state.additionalTransfrom === 5) {
              this.setState({ additionalTransfrom: 0 })
            }
          }}
        >
          {roundsData.map(round => (
            <div>
              <RoundCard
                key={round.epoch}
                cardState={round.cardState}
                cardId={round.epoch}
                duration={round.cardDuration}
                payoutDown={round.payoutDown}
                payoutUp={round.payoutUp}
                prizePool={round.totalAmount}
              />
            </div>
          ))}
        </Carousel>
        ;
      </>
    )
  }
}

export default CustomSlider
