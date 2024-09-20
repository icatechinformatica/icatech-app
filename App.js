import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Navigator from './Navigator';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './store';
import { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'

const App = () => {
  return (
    <PaperProvider>
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigator />
        </PersistGate>
      </StoreProvider>
    </PaperProvider>
  )
}

export default App;