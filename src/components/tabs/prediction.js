import { Row, Col, Divider } from 'antd'
import React, { useState } from 'react'
import { Button, Radio, Space, Typography } from 'antd'
import { QuestionCircleOutlined, TrophyOutlined } from '@ant-design/icons'
import RoundCard from './roundCard.js'


// Carasouel
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const { Text } = Typography

class PredictionTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      additionalTransfrom: 20,
    };
  }

  render () {
    const defaultPrice = (
      <Row align='middle'>
        <Space>
          <Typography.Title level={3} style={{ margin: 0 }}>
            SOLUSDT
          </Typography.Title>

          <Text>$66.51</Text>
        </Space>
      </Row>
    )

    const defaultInfo = (
      <Row justify='end' align='middle'>
        <Space>
          <Col offset={1}>
            <Button
              type='primary'
              icon={<QuestionCircleOutlined />}
              size='large'
            />
          </Col>
          <Col offset={1}>
            <Button type='primary' icon={<TrophyOutlined />} size='large' />
          </Col>
        </Space>
      </Row>
    )

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
            150
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
                (this.state.additionalTransfrom === 150 ? 0 : 150)) /
              value
            }
            onChange={e => {
              if (this.Carousel.isAnimationAllowed) {
                this.Carousel.isAnimationAllowed = false
              }
              const nextTransform = e.target.value * value
              const nextSlide = Math.round(nextTransform / carouselItemWidth)
              if (
                e.target.value == 0 &&
                this.state.additionalTransfrom === 150
              ) {
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

    return (
      <>
        <div>
          {defaultPrice}
          {defaultInfo}
        </div>
        <Carousel
          ssr={false}
          ref={el => (this.Carousel = el)}
          partialVisible={false}
          customButtonGroup={<CustomSlider />}
          itemClass='image-item'
          itemAriaLabel='Image-aria-label'
          responsive={responsive}
          containerClass='carousel-container-with-scrollbar'
          additionalTransfrom={-this.state.additionalTransfrom}
          beforeChange={nextSlide => {
            if (nextSlide !== 0 && this.state.additionalTransfrom !== 150) {
              this.setState({ additionalTransfrom: 150 })
            }
            if (nextSlide === 0 && this.state.additionalTransfrom === 150) {
              this.setState({ additionalTransfrom: 0 })
            }
          }}
        >
          <div>
            <RoundCard cardState='Expired' cardId='1' startTimeInSeconds='0' />
          </div>
          <div>
            <RoundCard cardState='Live' cardId='2' startTimeInSeconds='0' />
          </div>
          <div>
            <RoundCard cardState='Next' cardId='3' startTimeInSeconds='0' />
          </div>
          <div>
            <RoundCard cardState='Later' cardId='4' startTimeInSeconds='0' />
          </div>
          <div>
            <RoundCard cardState='Later' cardId='5' startTimeInSeconds='0' />
          </div>
          <div>
            <RoundCard cardState='Later' cardId='6' startTimeInSeconds='0' />
          </div>
        </Carousel>
        ;
      </>
    )
  }
}

export default PredictionTab
