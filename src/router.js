import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import { Spin } from 'antd'
import dynamic from 'dva/dynamic'
import { persistStore, REHYDRATE } from 'redux-persist'
import { PersistGate } from 'redux-persist/lib/integration/react'
import App from 'routes/app'
import seedStore from 'helpers/seedStore'

const Loading = <Spin size="large" />
dynamic.setDefaultLoadingComponent(() => Loading)

const createPersistor = (store) => {
  const persistor = persistStore(store, null, () => seedStore(store))
  persistor.dispatch({
    type: REHYDRATE,
  })
  return persistor
}

const { ConnectedRouter } = routerRedux

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  })
  const routes = [
    {
      path: '/user',
      models: () => [import('./models/user')],
      component: () => import('./routes/user/'),
    }, {
      path: '/user/:id',
      models: () => [import('./models/user/detail')],
      component: () => import('./routes/user/detail/'),
    }, {
      path: '/login',
      models: () => [import('./models/login')],
      component: () => import('./routes/login/'),
    }, {
      path: '/request',
      component: () => import('./routes/request/'),
    },
  ]

  return (
    <PersistGate persistor={createPersistor(app._store)} loading={Loading}>
      <ConnectedRouter history={history}>
        <App>
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/user" />)} />
            {
              routes.map(({ path, ...dynamics }, key) => (
                <Route key={key}
                  exact
                  path={path}
                  component={dynamic({
                    app,
                    ...dynamics,
                  })}
                />
              ))
            }
            <Route component={error} />
          </Switch>
        </App>
      </ConnectedRouter>
    </PersistGate>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
