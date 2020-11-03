import React from 'react';
import { PersistGate } from 'redux-persist/integration/react'
import MainApp from './src/main'
import { Provider } from 'react-redux'
import configureStore from './src/_redux'


const App = () => {
  const { persistor, store } = configureStore()

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainApp />
      </PersistGate>
    </Provider>
  );
};

export default App;
