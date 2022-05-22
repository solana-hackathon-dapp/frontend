import React from 'react'
import styled from 'styled-components' //eslint-disable-line
import tw from 'twin.macro'
import { css } from 'styled-components/macro' //eslint-disable-line

import { Button, Tabs, Row, Col } from 'antd'
import Prediction from './prediction.js'
import Layout from 'antd/lib/layout/layout'
import CreateRound from '../../view/initRound'

const { TabPane } = Tabs

export default () => (
  <div className='card-container sub-element'>
    <Layout>
      <Row>
        <Col>
          <CreateRound/>
        </Col>
        <Col>
          <Button block>Lock Round</Button>
        </Col>
        <Col>
          <Button block>End Round</Button>
        </Col>
      </Row>

      <Tabs type='card' centered>
        <TabPane tab='Prediction SOL' key='1'>
          <Prediction />
        </TabPane>
        <TabPane tab='Chainlink Chart' key='2'>
          <p>Content of Tab Pane 2</p>
          <p>Content of Tab Pane 2</p>
          <p>Content of Tab Pane 2</p>
        </TabPane>
      </Tabs>
    </Layout>
  </div>
)
