import { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useConnectedWallet } from '@gokiprotocol/walletkit'
import { web3, utils, BN } from '@project-serum/anchor'

import { Button, Col, Input, Modal, notification, Row, Typography } from 'antd'

import { AppState } from 'store'
import { getProgram } from 'config'
import { setRound } from 'store/rounds.reducer'

const LockRound = () => {
  const [epochChoose, setEpochChoose] = useState(1)
  const {
    rounds: { [epochChoose]: roundData },
  } = useSelector((state: AppState) => state)
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [duration, setDuration] = useState(300)
  const [lockPrice, setLockPrice] = useState('')
  const wallet = useConnectedWallet()
  

  const onLockRound = async () => {
    if (!wallet) return
    const roundAddress = roundData.address;
    const program = getProgram(wallet)
    const roundPublicKey = new web3.PublicKey(roundAddress)
    const mintPublicKey = new web3.PublicKey(roundData.mint)

    const [treasurer] = await web3.PublicKey.findProgramAddress(
      [Buffer.from('treasurer'), roundPublicKey.toBuffer()],
      program.programId,
    )
    const [ballot] = await web3.PublicKey.findProgramAddress(
      [Buffer.from('ballot'), roundPublicKey.toBuffer(), wallet.publicKey.toBuffer()],
      program.programId,
    )
    // Derive token account
    let walletTokenAccount = await utils.token.associatedAddress({
      mint: mintPublicKey,
      owner: wallet.publicKey,
    })
    let roundTokenAccount = await utils.token.associatedAddress({
      mint: mintPublicKey,
      owner: treasurer,
    })

    const now = Math.floor(new Date().getTime() / 1000)
    const lockTime = now.valueOf()
    const closeTime = lockTime + duration;

    try {
      setLoading(true)
      await program.methods
        .lockRound(new BN(closeTime), new BN(lockPrice))
        .accounts({
          authority: wallet.publicKey,
          round: roundPublicKey,
          tokenProgram: utils.token.TOKEN_PROGRAM_ID,
          associatedTokenProgram: utils.token.ASSOCIATED_PROGRAM_ID,
          systemProgram: web3.SystemProgram.programId,
          rent: web3.SYSVAR_RENT_PUBKEY,
        })
        .signers([])
        .rpc();

      setVisible(false)
      dispatch(setRound({ ...roundData, closePrice: Number(lockPrice), closeTimestamp: closeTime }))
      return notification.success({ message: 'Locked Round' })
    } catch (er: any) {
      return notification.error({ message: er.message })
    } finally {
      return setLoading(false)
    }
  }

  return (
    <Fragment>
      <Button type="dashed" onClick={() => setVisible(true)} block loading={loading}>
        Lock round
      </Button>
      <Modal
        title={<Typography.Title level={4}>Lock round</Typography.Title>}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        destroyOnClose={true}
        centered={true}
      >
        <Row gutter={[24, 12]}>

          <Col span={24}>
            <Typography.Text type="secondary">Epoch:</Typography.Text>
          </Col>
          <Col span={24}>
            <Input defaultValue={1} onChange={(e) => setEpochChoose(parseInt(e.target.value) || 1)}></Input>
          </Col>

          <Col span={24}>
            <Typography.Text type="secondary">Price: </Typography.Text>
            <Input
              style={{ width: '100%' }}
              value={lockPrice}
              onChange={(e) => setLockPrice(e.target.value)}
            />
          </Col>
          <Col span={24}>
            <Typography.Text type="secondary">Time to close: </Typography.Text>
            <Input
              style={{ width: '100%' }}
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
            />
          </Col>
          <Col span={24}>
            <Button type="primary" onClick={() => onLockRound()} loading={loading} block>
              Lock Round
            </Button>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default LockRound
