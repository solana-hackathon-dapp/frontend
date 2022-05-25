import { Fragment, useState, FC } from 'react'
import { useDispatch } from 'react-redux'
import { useConnectedWallet } from '@gokiprotocol/walletkit'

import { Button, Col, DatePicker, Modal, Row, Space, Typography, Input, notification } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'

import { setRound } from 'store/rounds.reducer'
import { getProgram } from '../config'

interface IProps {
    lastEpoch: number,    
}

const CreateRound: FC<IProps> = ({lastEpoch}: IProps) => {
    const [visible, setVisible] = useState(false)
    const [duration, setDuration] = useState(300)
    const dispatch = useDispatch()
    const wallet = useConnectedWallet()

    const onCreateRound = async () => {
        if (!wallet || !duration) return
        const program = getProgram(wallet)

        const now = Math.floor(new Date().getTime() / 1000)
        const startTime = now.valueOf() + duration;

        dispatch(
            setRound({
                address: '',
                mint: '',
                startTimestamp: startTime,
                lockTimestamp: 0,
                closeTimestamp: 0,

                lockPrice: 0,
                closePrice: 0,
                epoch: lastEpoch + 1,
                totalAmount: 0,
                upAmount: 0,
                downAmount: 0,
                rewardBaseCalAmount: 0,
                rewardAmount: 0,

                payoutUp: 0,
                payoutDown: 0,

                cardState: 'Later',
                cardDuration: duration,
            }),
        )
        setVisible(false)
        return notification.success({ message: 'Created a round' })

    }

    return (
        <Fragment>
            <Button icon={<UserAddOutlined />} onClick={() => setVisible(true)} block>
                Init Round
            </Button>
            <Modal
                title={<Typography.Title level={4}>New Round</Typography.Title>}
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={null}
                destroyOnClose={true}
                centered={true}
            >
                <Row gutter={[12, 12]}>
                    <Col span={24}>
                        <Typography.Text type="secondary">Start In Duration(Seconds):</Typography.Text>
                    </Col>
                    <Col span={24}>
                        <Input defaultValue={300} onChange={(e) => setDuration(parseInt(e.target.value) || 0)}></Input>
                    </Col>
                    <Col span={24}>
                        <Button type="primary" onClick={onCreateRound} block>
                            Create Round
                        </Button>
                    </Col>
                </Row>
            </Modal>
        </Fragment>
    )
}

export default CreateRound
