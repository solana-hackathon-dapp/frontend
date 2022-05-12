import { useCallback, useEffect, useState } from "react";
import { useWalletKit, useSolana, useConnectedWallet } from "@gokiprotocol/walletkit";

import { Button, Col, Row } from "antd";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SaaSProductLandingPage from "demos/SaaSProductLandingPage.js";
import ComponentRenderer from "ComponentRenderer.js";
import ThankYouPage from "ThankYouPage.js";

import "./App.css";

function App() {
  // State: balance (type = number, default value = 0)
  const [balance, setBalance] = useState<number>(0);
  // Goki hooks
  const wallet = useConnectedWallet();
  const { connect } = useWalletKit();
  const { disconnect, providerMut } = useSolana();

  const fetchBalance = useCallback(async () => {
    // TODO: fetch balance
    if (wallet && providerMut) {
      let balance = await providerMut.connection.getBalance(wallet.publicKey);
      return setBalance(balance);
    }
    setBalance(0);
  }, [providerMut, wallet]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return (
    <Router>
      <Switch>
        <Route path="/components/:type/:subtype/:name">
          <ComponentRenderer />
        </Route>
        <Route path="/components/:type/:name">
          <ComponentRenderer />
        </Route>
        <Route path="/thank-you">
          <ThankYouPage />
        </Route>
        <Route path="/">
          <SaaSProductLandingPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
