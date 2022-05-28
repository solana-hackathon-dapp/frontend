import { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useConnectedWallet } from '@gokiprotocol/walletkit'
import { web3, utils, BN } from '@project-serum/anchor'

import { Button, Col, Input, Modal, notification, Row, Typography } from 'antd'

import axios from 'axios'

import { AppState } from 'store'
import { getProgram } from 'config'
import { setRound } from 'store/rounds.reducer'

const EndRound = () => {
  const [epochChoose, setEpochChoose] = useState(1)
  const {
    rounds: { [epochChoose]: roundData },
  } = useSelector((state: AppState) => state)
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const wallet = useConnectedWallet()
  
  async function getPrice () {
    const request = `https://api.binance.com/api/v1/ticker/price?symbol=SOLUSDT`
    return new Promise <number> (async (resolve, reject) => {
      axios.get(request).then(res => {
        const priceSOL = res.data
        return resolve(priceSOL.price)
      })
    })
  }

  const onEndRound = async () => {
    if (!wallet) return
    const roundAddress = roundData.address;
    const program = getProgram(wallet)
    const roundPublicKey = new web3.PublicKey(roundAddress)
    const mintPublicKey = new web3.PublicKey(roundData.mint)

    const price = await getPrice();

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

    try {
      setLoading(true)
      await program.methods
        .endRound(price)
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

    await program.methods
        .calculateRewards(price)
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
      dispatch(setRound({ ...roundData, closePrice: Number(price),
      cardState: "Expired"}))
      return notification.success({ message: 'Ended Round' })
    } catch (er: any) {
      return notification.error({ message: er.message })
    } finally {
      return setLoading(false)
    }
  }

  

  return (
    <Fragment>
      <Button type="dashed" onClick={() => setVisible(true)} block loading={loading}>
      End round
      </Button>
      <Modal
        title={<Typography.Title level={4}>End round</Typography.Title>}
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
            <Button type="primary" onClick={() => onEndRound()} loading={loading} block>
            End Round
            </Button>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default EndRound
