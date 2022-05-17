import { useCallback, useEffect, useState } from "react";
import { useWalletKit, useSolana, useConnectedWallet } from "@gokiprotocol/walletkit";

import { Button, Col, Row } from "antd";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SaaSProductLandingPage from "demos/SaaSProductLandingPage.js";
import ComponentRenderer from "ComponentRenderer.js";
import ThankYouPage from "ThankYouPage.js";
import SocketComponent from "./components/sockets/socketComponent";

import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/test-websocket">
          <SocketComponent />
        </Route>
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
