import { Card, Layout, Typography, Row, Col, Progress, Button, Space } from 'antd'
import React from 'react'
import { PlayCircleTwoTone } from '@ant-design/icons'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'

import Timer from './timer.js'

const { Text } = Typography
const { Meta } = Card

class RoundCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      cardState: props.cardState,
      cardId: props.cardId,
      seconds: parseInt(props.startTimeInSeconds, 10) || 0,
      payoutUp: 1.3,
      payoutDown: 2,
      price: 65.2,
      priceChangeFromLock: 0.2,
      lockedPrice: 66.0,
      prizePool: 200
    }
  }

  tick () {
    this.setState(state => ({
      seconds: state.seconds + 10
    }))
  }

  componentDidMount () {
    this.interval = setInterval(() => this.tick(), 10000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    const fiveMinute = 300
    const isUp = this.state.price > this.state.lockedPrice ? true : false

    if (this.state.cardState == 'Live')
      return (
        <Card style={{ width: 300 }}>
          <Layout>
            <Row>
              <Col span={8}>
                <div className='flex-column'>
                  <PlayCircleTwoTone />
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    {this.state.cardState}
                  </Typography.Title>
                </div>
              </Col>
              <Col span={6}>
                <Timer />
              </Col>
              <Col span={6} offset={4}>
                <Text>{this.state.cardId}</Text>
              </Col>
            </Row>

            <div className={isUp ? 'up_component' : 'normal_component'}>
              <Row justify='center'>
                <Text> UP </Text>
              </Row>
              <Row justify='center'>
                <Text> {this.state.payoutUp}x Payout </Text>
              </Row>
            </div>

            <div className='round_border_card'>
              <Row>
                <Text className='opacity_half bold'>LAST PRICE</Text>
              </Row>

              <Row className='p_top'>
                <Col span={12}>
                  <Row className={isUp ? 'color_spring_green size_large' : 'color_red size_large'}>${this.state.price}</Row>
                </Col>
                <Col span={12}>
                  <Row
                    className={isUp ? 'up_component small_price' : 'down_component small_price'}
                    justify='center'
                  >
                    {isUp
                      ?<ArrowUpOutlined />                   
                      :<ArrowDownOutlined /> 
                    }
                    ${this.state.priceChangeFromLock}
                  </Row>
                </Col>
              </Row>

              <Row className='p_top'>
                <Col span={12}>
                  <Row>Locked Price:</Row>
                </Col>
                <Col span={12}>
                  <Row justify='center'>${this.state.lockedPrice}</Row>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <Row>
                    <Text className='bold'>Prize Pool:</Text>
                    </Row>
                </Col>
                <Col span={12}>
                  <Row className='bold' justify='center'>{this.state.prizePool} SOL</Row>
                </Col>
              </Row>
            </div>

            <div className='down_component'>
              <Row justify='center'>
                <Text> {this.state.payoutDown}x Payout </Text>
              </Row>
              <Row justify='center'>
                <Text> DOWN </Text>
              </Row>
            </div>
          </Layout>
        </Card>
      )
    else if (this.state.cardState == 'Expired')
      return (
        <Card style={{ width: 300 }}>
          <Layout>
            <Row>
              <Col span={8}>
                <div className='flex-column'>
                  <PlayCircleTwoTone />
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    {this.state.cardState}
                  </Typography.Title>
                </div>
              </Col>
              <Col span={6}>
                <Timer />
              </Col>
              <Col span={6} offset={4}>
                <Text>{this.state.cardId}</Text>
              </Col>
            </Row>
            <Progress
              percent={(this.state.seconds / fiveMinute) * 100}
              showInfo={false}
            />

            <div className='up_component'>
              <Row justify='center'>
                <Text> UP </Text>
              </Row>
              <Row justify='center'>
                <Text> {this.state.payoutUp}x Payout </Text>
              </Row>
            </div>

            <div>
              <Row>LAST PRICE</Row>

              <Row>
                <Col span={12}>
                  <Row>${this.state.price}</Row>
                </Col>
                <Col span={12}>
                  <Row justify='center'>
                    <ArrowUpOutlined /> ${this.state.priceChangeFromLock}
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <Row>Locked Price:</Row>
                </Col>
                <Col span={12}>
                  <Row justify='center'>${this.state.lockedPrice}</Row>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <Row>Prize Pool:</Row>
                </Col>
                <Col span={12}>
                  <Row justify='center'>{this.state.prizePool} SOL</Row>
                </Col>
              </Row>
            </div>

            <div>
              <Row justify='center'>
                <Text> {this.state.payoutDown}x Payout </Text>
              </Row>
              <Row justify='center'>
                <Text> DOWN </Text>
              </Row>
            </div>
          </Layout>
        </Card>
      )
    else if (this.state.cardState == 'Next')
      return (
        <Card style={{ width: 300 }}>
          <Layout>
            <Row>
              <Col span={8}>
                <div className='flex-column'>
                  <PlayCircleTwoTone />
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    {this.state.cardState}
                  </Typography.Title>
                </div>
              </Col>
              <Col span={6}>
                <Timer />
              </Col>
              <Col span={6} offset={4}>
                <Text>{this.state.cardId}</Text>
              </Col>
            </Row>
            <Progress
              percent={(this.state.seconds / fiveMinute) * 100}
              showInfo={false}
            />

            <div>
              <Row justify='center'>
                <Text> UP </Text>
              </Row>
              <Row justify='center'>
                <Text> {this.state.payoutUp}x Payout </Text>
              </Row>
            </div>

            <div>
              <Row>
                <Col span={12}>
                  <Row>Prize Pool:</Row>
                </Col>
                <Col span={12}>
                  <Row justify='center'>
                    <ArrowUpOutlined /> {this.state.prizePool} SOL
                  </Row>
                </Col>
              </Row>
              <Button className='up_component'  block>
                Enter UP
              </Button>

              <Button className='down_component'  block>
                Enter DOWN
              </Button>
            </div>

            <div>
              <Row justify='center'>
                <Text> {this.state.payoutDown}x Payout </Text>
              </Row>
              <Row justify='center'>
                <Text> DOWN </Text>
              </Row>
            </div>
          </Layout>
        </Card>
      )
    else if (this.state.cardState == 'Later')
      return (
        <Card style={{ width: 300 }}>
          <Layout>
            <Row>
              <Col span={8}>
                <div className='flex-column'>
                  <PlayCircleTwoTone />
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    {this.state.cardState}
                  </Typography.Title>
                </div>
              </Col>
              <Col span={6}>
                <Timer />
              </Col>
              <Col span={6} offset={4}>
                <Text>{this.state.cardId}</Text>
              </Col>
            </Row>
            <Progress
              percent={(this.state.seconds / fiveMinute) * 100}
              showInfo={false}
            />

            <div>
              <Row justify='center'>
                <Text> UP </Text>
              </Row>
              <Row justify='center'>
                <Text> {this.state.payoutUp}x Payout </Text>
              </Row>
            </div>

            <div>
              <Row>ENTER START IN: .....</Row>
            </div>

            <div>
              <Row justify='center'>
                <Text> {this.state.payoutDown}x Payout </Text>
              </Row>
              <Row justify='center'>
                <Text> DOWN </Text>
              </Row>
            </div>
          </Layout>
        </Card>
      )
  }
}

export default RoundCard
