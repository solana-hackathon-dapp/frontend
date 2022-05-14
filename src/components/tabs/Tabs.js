import React from 'react'
import styled from 'styled-components' //eslint-disable-line
import tw from 'twin.macro'
import { css } from 'styled-components/macro' //eslint-disable-line

import { Tabs } from 'antd';
import Prediction from './prediction.js'

const { TabPane } = Tabs;

export default () => (
  <div className="card-container sub-element">
    <Tabs type="card" centered>
      <TabPane tab="Prediction SOL" key="1">
        <Prediction/>
      </TabPane>
      <TabPane tab="Chainlink Chart" key="2">
        <p>Content of Tab Pane 2</p>
        <p>Content of Tab Pane 2</p>
        <p>Content of Tab Pane 2</p>
      </TabPane>
    </Tabs>
  </div>
);