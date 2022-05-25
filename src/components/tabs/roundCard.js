import {
  Card,
  Layout,
  Typography,
  Row,
  Col,
  Progress,
  Button,
  Space
} from 'antd'
import React from 'react'
import { PlayCircleTwoTone } from '@ant-design/icons'
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  StopOutlined,
  ClockCircleOutlined
} from '@ant-design/icons'
import axios from 'axios'

import Timer from './timer.js'
import SetPostition from '../../view/bet'

const { Text } = Typography
const { Meta } = Card

class RoundCard extends React.Component {
  state = {
    seconds: 0,
    price: 66.2,
    priceChangeFromLock: 0.2,
  }

  async tick () {
    if (this.props.cardState == 'Live') {
      let price = await this.getPrice()
      let priceFloat = Number(price).toFixed(2);
      const priceChangeFromLock = price - lockedPrice
      let priceChangeFloat = Number(priceChangeFromLock).toFixed(2);

      this.setState(state => ({
        seconds: state.seconds + 10,
        price: priceFloat,
        priceChangeFromLock: priceChangeFloat
      }))
    }
  }

  async getPrice () {
    const request = `https://api.binance.com/api/v1/ticker/price?symbol=SOLUSDT`
    return new Promise(async (resolve, reject) => {
      axios.get(request).then(res => {
        const priceSOL = res.data
        return resolve(priceSOL.price)
      })
    })
  }

  componentDidMount () {
    this.tick();
    this.interval = setInterval(() => this.tick(), 10000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    const cardState = this.props.cardState
    const cardId = this.props.cardId
    const cardDuration = this.props.duration
    const payoutDown = this.props.payoutDown;
    const payoutUp = this.props.payoutUp;
    const prizePool = this.props.prizePool
    const lockedPrice = this.props.lockedPrice;
    let lockedPriceFloat = Number(lockedPrice).toFixed(2);

    const fiveMinute = 300
    const isUp = this.state.price > lockedPriceFloat ? true : false

    if (cardState == 'Live')
      return (
        <Card style={{ width: 300, borderRadius: 10, height: 370 }}>
          <Layout>
            <Row>
              <Col span={8}>
                <div className='flex-column'>
                  <PlayCircleTwoTone />
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    {cardState}
                  </Typography.Title>
                </div>
              </Col>
              <Col span={6}> <Timer duration={cardDuration} /> </Col>
              <Col span={6} offset={4}>
                <Typography.Text style={{ marginTop: 5 }}>
                  #{cardId}
                </Typography.Text>
              </Col>
            </Row>
            <Progress
              percent={(this.state.seconds / fiveMinute) * 100}
              showInfo={false}
            />

            <div className={isUp ? 'up_component' : 'normal_component'}>
              <Row justify='center'>
                <Text> UP </Text>
              </Row>
              <Row justify='center'>
                <Text> {payoutUp}x Payout </Text>
              </Row>
            </div>

            <div className='round_border_card'>
              <Row>
                <Text className='opacity_half bold'>LAST PRICE</Text>
              </Row>

              <Row className='p_top'>
                <Col span={12}>
                  <Row
                    className={
                      isUp
                        ? 'color_spring_green size_large'
                        : 'color_red size_large'
                    }
                  >
                    ${this.state.price}
                  </Row>
                </Col>
                <Col span={12}>
                  <Row
                    className={
                      isUp
                        ? 'up_component small_price'
                        : 'down_component small_price'
                    }
                    justify='center'
                  >
                    {isUp ? (
                      <ArrowUpOutlined className='p_top_5' />
                    ) : (
                      <ArrowDownOutlined className='p_top_5' />
                    )}
                    ${this.state.priceChangeFromLock}
                  </Row>
                </Col>
              </Row>

              <Row className='p_top'>
                <Col span={12}>
                  <Row>Locked Price:</Row>
                </Col>
                <Col span={12}>
                  <Row justify='center'>${lockedPriceFloat}</Row>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <Row>
                    <Text className='bold'>Prize Pool:</Text>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row className='bold' justify='center'>
                    {prizePool} SOL
                  </Row>
                </Col>
              </Row>
            </div>

            <div className={!isUp ? 'down_component' : 'normal_component'}>
              <Row justify='center'>
                <Text> {payoutDown}x Payout </Text>
              </Row>
              <Row justify='center'>
                <Text> DOWN </Text>
              </Row>
            </div>
          </Layout>
        </Card>
      )
    else if (cardState == 'Expired')
      return (
        <Card className='expired' style={{ width: 300, borderRadius: 10 }}>
          <Layout>
            <Row>
              <Col span={8}>
                <div className='flex-column'>
                  <StopOutlined />
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    {cardState}
                  </Typography.Title>
                </div>
              </Col>
              <Col span={6}></Col>
              <Col span={6} offset={4}>
                <Typography.Text style={{ marginTop: 10 }}>
                  #{cardId}
                </Typography.Text>
              </Col>
            </Row>

            <div className={isUp ? 'up_component' : 'normal_component'}>
              <Row justify='center'>
                <Text> UP </Text>
              </Row>
              <Row justify='center'>
                <Text> {payoutUp}x Payout </Text>
              </Row>
            </div>

            <div className='round_border_card'>
              <Row>
                <Text className='opacity_half bold'>LAST PRICE</Text>
              </Row>

              <Row className='p_top'>
                <Col span={12}>
                  <Row
                    className={
                      isUp
                        ? 'color_spring_green size_large'
                        : 'color_red size_large'
                    }
                  >
                    ${this.state.price}
                  </Row>
                </Col>
                <Col span={12}>
                  <Row
                    className={
                      isUp
                        ? 'up_component small_price'
                        : 'down_component small_price'
                    }
                    justify='center'
                  >
                    {isUp ? (
                      <ArrowUpOutlined className='p_top_5' />
                    ) : (
                      <ArrowDownOutlined className='p_top_5' />
                    )}
                    ${this.state.priceChangeFromLock}
                  </Row>
                </Col>
              </Row>

              <Row className='p_top'>
                <Col span={12}>
                  <Row>Locked Price:</Row>
                </Col>
                <Col span={12}>
                  <Row justify='center'>${lockedPriceFloat}</Row>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <Row>
                    <Text className='bold'>Prize Pool:</Text>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row className='bold' justify='center'>
                    {prizePool} SOL
                  </Row>
                </Col>
              </Row>
            </div>

            <div className={!isUp ? 'down_component' : 'normal_component'}>
              <Row justify='center'>
                <Text> {payoutDown}x Payout </Text>
              </Row>
              <Row justify='center'>
                <Text> DOWN </Text>
              </Row>
            </div>
          </Layout>
        </Card>
      )
    else if (cardState == 'Next')
      return (
        <Card style={{ width: 300, borderRadius: 10 }}>
          <Layout>
            <Row>
              <Col span={8}>
                <div className='flex-column'>
                  <PlayCircleTwoTone />
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    {cardState}
                  </Typography.Title>
                </div>
              </Col>
              <Col span={6}> <Timer duration={cardDuration} /></Col>
              <Col span={6} offset={4}>
                <Typography.Text style={{ marginTop: 10 }}>
                  #{cardId}
                </Typography.Text>
              </Col>
            </Row>

            <div className='up_component'>
              <Row justify='center'>
                <Text> UP </Text>
              </Row>
              <Row justify='center'>
                <Text> {payoutUp}x Payout </Text>
              </Row>
            </div>

            <div className='round_border_card border_color_rainbow'>
              <Row className='p_top'>
                <Col span={12}>
                  <Row>
                    <Text className='bold'>Prize Pool:</Text>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row className='bold' justify='center'>
                    {prizePool} SOL
                  </Row>
                </Col>
              </Row>

              <SetPostition isBetUp={true} epochChoose={cardId}/>

              <SetPostition isBetUp={false} epochChoose={cardId}/>
            </div>

            <div className='down_component'>
              <Row justify='center'>
                <Text> {payoutDown}x Payout </Text>
              </Row>
              <Row justify='center'>
                <Text> DOWN </Text>
              </Row>
            </div>
          </Layout>
        </Card>
      )
    else if (cardState == 'Later')
      return (
        <Card style={{ width: 300, borderRadius: 10, marginTop: 50 }}>
          <Layout>
            <Row>
              <Col span={8}>
                <div className='flex-column'>
                  <ClockCircleOutlined />
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    {cardState}
                  </Typography.Title>
                </div>
              </Col>
              <Col span={6}></Col>
              <Col span={6} offset={4}>
                <Typography.Text style={{ marginTop: 10 }}>
                  #{cardId}
                </Typography.Text>
              </Col>
            </Row>

            <div className='expired'>
              <Row justify='center'>
                <Text> UP </Text>
              </Row>
              <Row justify='center'>
                <Text> {payoutUp}x Payout </Text>
              </Row>
            </div>

            <div className='round_border_card border_color_gray '>
              <Row>
                <Col className='bold'>ENTER START IN: ~~</Col>
                <Col offset={2}>
                  <Timer duration={cardDuration} />
                </Col>
              </Row>
            </div>

            <div className='expired'>
              <Row justify='center'>
                <Text> {payoutDown}x Payout </Text>
              </Row>
              <Row justify='center'>
                <Text> DOWN </Text>
              </Row>
            </div>
          </Layout>
        </Card>

        // test
      )
  }
}

export default RoundCard
