import { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useConnectedWallet } from '@gokiprotocol/walletkit'
import { web3, utils, BN } from '@project-serum/anchor'

import { Button, Col, Input, Modal, notification, Row, Typography } from 'antd'

import { AppState } from 'store'
import { getProgram } from 'config'
import { setRound } from 'store/rounds.reducer'
import { setBallot } from 'store/ballot.reducer'

const setPostition = ({ epochChoose, isBetUp }: { epochChoose: string, isBetUp: boolean }) => {
  const {
    rounds: { [epochChoose]: roundData },
  } = useSelector((state: AppState) => state)
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState(0)
  const wallet = useConnectedWallet()


  const onBet = async () => {
    if (!wallet) return
    const amountWithDecimal = amount * 1000000000;
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

    if (isBetUp)
      try {
        setLoading(true)
        await program.methods
          .betUp(new BN(amountWithDecimal))
          .accounts({
            authority: wallet.publicKey,
            round: roundPublicKey,
            treasurer,
            mint: roundData.mint,
            roundTokenAccount,
            ballot,
            beterTokenAccount: walletTokenAccount,
            tokenProgram: utils.token.TOKEN_PROGRAM_ID,
            associatedTokenProgram: utils.token.ASSOCIATED_PROGRAM_ID,
            systemProgram: web3.SystemProgram.programId,
            rent: web3.SYSVAR_RENT_PUBKEY,
          })
          .signers([])
          .rpc();

        const totalAmount = roundData.totalAmount + Number(amount)
        const downAmount = roundData.downAmount;
        const upAmount = roundData.upAmount + Number(amount);

        const payoutUp = totalAmount / upAmount;
        const payoutDown = totalAmount / downAmount;

        setVisible(false)
        dispatch(setRound({
          ...roundData, upAmount: roundData.upAmount + Number(amount),
          totalAmount: roundData.totalAmount + Number(amount),
          payoutUp: payoutUp,
          payoutDown: payoutDown,
        }))
        dispatch(
          setBallot({
            address: ballot.toBase58(),
            round: roundAddress,
            authority: wallet.publicKey.toBase58(),
            amount: amountWithDecimal,
            pos: 1,
            claimed: 0,
          }),
        )

        return notification.success({ message: 'Enter Succesful' })
      } catch (er: any) {
        return notification.error({ message: er.message })
      } finally {
        return setLoading(false)
      }
    else
      try {
        setLoading(true)
        await program.methods
          .betDown(new BN(amountWithDecimal))
          .accounts({
            authority: wallet.publicKey,
            round: roundPublicKey,
            treasurer,
            mint: roundData.mint,
            roundTokenAccount,
            ballot,
            beterTokenAccount: walletTokenAccount,
            tokenProgram: utils.token.TOKEN_PROGRAM_ID,
            associatedTokenProgram: utils.token.ASSOCIATED_PROGRAM_ID,
            systemProgram: web3.SystemProgram.programId,
            rent: web3.SYSVAR_RENT_PUBKEY,
          })
          .signers([])
          .rpc();

        const totalAmount = roundData.totalAmount + Number(amount)
        const downAmount = roundData.downAmount + Number(amount);
        const upAmount = roundData.upAmount;

        const payoutUp = totalAmount / upAmount;
        const payoutDown = totalAmount / downAmount;

        setVisible(false)
        dispatch(setRound({
          ...roundData,
          downAmount: roundData.downAmount + Number(amount),
          totalAmount: roundData.totalAmount + Number(amount),
          payoutUp: payoutUp,
          payoutDown: payoutDown,
        }))
        dispatch(
          setBallot({
            address: ballot.toBase58(),
            round: roundAddress,
            authority: wallet.publicKey.toBase58(),
            amount: amountWithDecimal,
            pos: 2,
            claimed: 0,
          }),
        )

        return notification.success({ message: 'Enter Succesful' })
      } catch (er: any) {
        return notification.error({ message: er.message })
      } finally {
        return setLoading(false)
      }
  }



  if (isBetUp)
    return (
      <Fragment>
        <Button className='up_component m_top' onClick={() => setVisible(true)} block loading={loading}>
          Enter UP
        </Button>
        <Modal
          title={<Typography.Title level={4}>Set Postition Up</Typography.Title>}
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={null}
          destroyOnClose={true}
          centered={true}
        >
          <Row gutter={[24, 12]}>

            <Col span={24}>
              <Typography.Text type="secondary">Amount: </Typography.Text>
              <Input
                style={{ width: '100%' }}
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
              />
            </Col>
            <Col span={24}>
              <Button type="primary" onClick={() => onBet()} loading={loading} block>
                Enter UP
              </Button>
            </Col>
          </Row>
        </Modal>
      </Fragment>
    )
  else
    return (
      <Fragment>
        <Button className='down_component m_top_5' onClick={() => setVisible(true)} block loading={loading}>
          Enter DOWN
        </Button>
        <Modal
          title={<Typography.Title level={4}>Set Postition Down</Typography.Title>}
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={null}
          destroyOnClose={true}
          centered={true}
        >
          <Row gutter={[24, 12]}>

            <Col span={24}>
              <Typography.Text type="secondary">Amount: </Typography.Text>
              <Input
                style={{ width: '100%' }}
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
              />
            </Col>
            <Col span={24}>
              <Button type="primary" onClick={() => onBet()} loading={loading} block>
                Enter DOWN
              </Button>
            </Col>
          </Row>
        </Modal>
      </Fragment>
    )
}

export default setPostition
