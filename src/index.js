import { message } from 'antd'
import dva from 'dva'

import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import createLoading from 'dva-loading'
import createHistory from 'history/createBrowserHistory'
import 'babel-polyfill'

import Loader from 'components/Loader'

import config from './../musereum.config'
import { REDUX_PREFIX } from 'helpers/constants'

const keySuffix = config.publicPath ? config.publicPath.replace(/\//g, '_').toUpperCase() : '';
const persist = config.persistCore === undefined ? process.env.ENVIRONMENT !== 'production' : config.persistCore;
const persistConfig = {
  debounce: 300,
  key: `${REDUX_PREFIX}${keySuffix}`,
  storage: storage,
  whitelist: (
    (persist ? [] : [])
  ),
  // transforms: (
  //   Object.keys(reducerConfig).map(k => (
  //     Array.isArray(reducerConfig[k].persist) && createFilter(k, reducerConfig[k].persist)
  //   )).filter(r => r)
  // ),
}

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  onAction: [thunk, createLogger()],
  onReducer: rootReducer => persistReducer(persistConfig, rootReducer),
  history: createHistory(),
  onError (error) {
    message.error(error.message)
  },
})

// 2. Model
app.model(require('./models/app'))
app.model(require('./models/network'))
app.model(require('./models/session'))
app.model(require('./models/web3Redux'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')
