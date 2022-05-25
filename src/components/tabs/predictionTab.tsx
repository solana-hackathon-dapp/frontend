import { useSelector } from 'react-redux'
import { useState } from 'react'

import { Button, Radio, Space, Typography, Col, Row } from 'antd'
import { QuestionCircleOutlined, TrophyOutlined } from '@ant-design/icons'
import { AppState } from 'store'

import CustomSlider from './Slider.js'

const PredictionTab = () => {
    const { rounds } = useSelector((state: AppState) => state)

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

    return (
        <>
            <div>
                {defaultInfo}
            </div>
            <CustomSlider rounds={rounds} />
        </>
    )
}

export default PredictionTab
