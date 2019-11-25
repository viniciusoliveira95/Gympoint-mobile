import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import { store, persistor } from './store';
import App from './App';

import colors from './styles/colors';

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.backGroundPrimary}
        />
        <App />
      </PersistGate>
    </Provider>
  );
}
