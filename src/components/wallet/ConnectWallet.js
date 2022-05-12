import { useWalletKit, useSolana, useConnectedWallet } from "@gokiprotocol/walletkit";
import { Button, Row } from "antd";
import React from "react";

export default ({ address, balance }) => {
  // Goki hooks
  const wallet = useConnectedWallet();
  const { connect } = useWalletKit();
  const { disconnect, providerMut } = useSolana();  

  return (
    <Row>
      {wallet ? (
            <Button type="primary" onClick={disconnect}>Disconnect
          </Button>
        ) : (
        // Call connectWallet function when click Button
        <Button type="primary" onClick={connect}>
          Connect Wallet
        </Button>
      )}
    </Row>
  )
}
