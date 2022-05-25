import { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useConnectedWallet } from '@gokiprotocol/walletkit'
import moment from 'moment'
import { web3, utils, BN } from '@project-serum/anchor'

import { Button, Col, DatePicker, Modal, Row, Space, Typography, Input, notification } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'

import { setRound } from 'store/rounds.reducer'
import { getProgram } from '../config'

const ClaimReward = () => {
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [epochChoose, setEpochChoose] = useState(1)
    const [mintAddress, setMintAddress] = useState('3471Z2CDwJcKpJz8CXkVxUTS2iSZ4gBxofxEtY1B3dYp')
    const dispatch = useDispatch()
    const wallet = useConnectedWallet()

    const onCreateRound = async () => {
        if (!wallet) return
        const program = getProgram(wallet)

        const now = Math.floor(new Date().getTime() / 1000)
        const startTime = now.valueOf();
        const lockTime = startTime + 300;
        const endTime = startTime + 300 * 2;

        console.log(startTime);

        const round = new web3.Keypair()
        let treasurer: web3.PublicKey

        const [treasurerPublicKey] = await web3.PublicKey.findProgramAddress(
            [Buffer.from('treasurer'), round.publicKey.toBuffer()],
            program.programId,
        )
        treasurer = treasurerPublicKey

        let roundTokenAccount = await utils.token.associatedAddress({
            mint: new web3.PublicKey(mintAddress),
            owner: treasurerPublicKey,
        })

        try {
            setLoading(true)
            await program.methods
                .initRound(new BN(startTime),
                    new BN(lockTime), new BN(endTime), new BN(1))
                .accounts({
                    authority: wallet.publicKey,
                    round: round.publicKey,
                    treasurer,
                    mint: new web3.PublicKey(mintAddress),
                    roundTokenAccount,
                    tokenProgram: utils.token.TOKEN_PROGRAM_ID,
                    associatedTokenProgram: utils.token.ASSOCIATED_PROGRAM_ID,
                    systemProgram: web3.SystemProgram.programId,
                    rent: web3.SYSVAR_RENT_PUBKEY,
                })
                .signers([round])
                .rpc();

            setVisible(false)
            return notification.success({ message: 'Claim Successful' })
        } catch (er: any) {
            return notification.error({ message: er.message })
        } finally {
            return setLoading(false)
        }
    }

    return (
        <Fragment>
            <Button type="primary" onClick={() => setVisible(true)} block loading={loading}>
                Claim Reward
            </Button>
            <Modal
                title={<Typography.Title level={4}>Claim Reward</Typography.Title>}
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={null}
                destroyOnClose={true}
                centered={true}
            >
                <Row gutter={[12, 12]}>
                    <Col span={24}>
                        <Typography.Text type="secondary">Epoch:</Typography.Text>
                    </Col>
                    <Col span={24}>
                        <Input defaultValue={1} onChange={(e) => setEpochChoose(parseInt(e.target.value) || 1)}></Input>
                    </Col>

                    <Col span={24}>
                        <Button type="primary" onClick={onCreateRound} block>
                            Claim
                        </Button>
                    </Col>
                </Row>
            </Modal>
        </Fragment>
    )
}

export default ClaimReward
