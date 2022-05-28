import {Col, Row} from "antd";

const WalletInfo = ({address, balance} : {address: string, balance: number}) => {
    return (
        <Row gutter={[24, 24]}>
            <Col span={24}>
                <Row gutter={[12,12]}>
                    <Col>Wallet address:</Col>
                    <Col>{address}</Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[12, 12]}>
                    <Col>Balance:</Col>
                    <Col>{balance}</Col>
                </Row>
            </Col>
        </Row>
    )
}

export default WalletInfo;