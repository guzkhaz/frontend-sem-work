import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
