import React from 'react'
import tw from 'twin.macro'

import { Button, Tabs, Row, Col } from 'antd'
import PredictionTab from './predictionTab'
import DataTab from './data'
import Layout from 'antd/lib/layout/layout'
import StartRound from '../../view/startRound'
import CreateRound from '../../view/initRound'
import LockRound from '../../view/lockRound'
import EndRound from '../../view/endRound'
import ClaimReward from '../../view/claim'

import { AppState } from 'store'
import { useSelector } from 'react-redux'

import { RoundData } from 'config/index'

const { TabPane } = Tabs

const TabsPanel = () => {
  const { rounds } = useSelector((state: AppState) => state)

  const roundLength = Object.keys(rounds).length;
  let lastRound;
  let lastEpoch = 0;
  if (roundLength > 0) 
  {
    let roundArray = Object.values(rounds);
    lastRound = roundArray[roundLength - 1];
    lastEpoch = lastRound.epoch;
  }

  return (
    <div className='card-container sub-element'>
      <Layout>
        <Row>
          <Col>
            <CreateRound lastEpoch={lastEpoch}/>
          </Col>
          <Col>
            <StartRound />
          </Col>
          <Col>
            <LockRound/>
          </Col>
          <Col>
            <EndRound/>
          </Col>
          <Col>
            <ClaimReward/>
          </Col>
        </Row>

        <Tabs type='card' centered>
          <TabPane tab='Prediction SOL' key='1'>
            <PredictionTab />
          </TabPane>
          <TabPane tab='Data' key='2'>
            <DataTab/>
          </TabPane>
          <TabPane tab='Chainlink Chart' key='3'>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
          </TabPane>
        </Tabs>
      </Layout>
    </div>
  )
}

export default TabsPanel