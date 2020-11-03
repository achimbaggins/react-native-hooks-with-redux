import { persistStore, persistCombineReducers } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

const persistConfig = {
  key: 'primary',
  storage: AsyncStorage
}

const middleware = applyMiddleware(thunk, logger)
const reducers = persistCombineReducers(persistConfig, rootReducer)

export default () => {
  let store = createStore(reducers, undefined, compose(middleware))
  let persistor = persistStore(store)
  return { store, persistor }
}
