// import React from 'react';
import './App.css';
import { Button, Col, Row } from 'antd';
import WalletInfo from './components/walletInfo';

function App() {
  return (
    <Row justify='center'>
      <Col>
        <WalletInfo address='This is wallet address' balance={0} />
      </Col>
      <Col span={24} style={{textAlign: 'center'}}>
        <Button type='primary'>Connect to your wallet</Button>
      </Col>
    </Row>
  );
}

export default App;
