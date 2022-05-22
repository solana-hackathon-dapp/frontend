import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import "./index.css";
import App from "./App";
import { WalletKitProvider } from "@gokiprotocol/walletkit";
import { store } from './store'

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <WalletKitProvider
        defaultNetwork="devnet"
        app={{
          name: 'My App',
        }}
      >
        <App />
      </WalletKitProvider>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
