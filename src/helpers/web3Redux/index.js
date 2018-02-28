import generateWeb3ReduxApi from './generateWeb3ReduxApi'
import generateNetworkApi from './generateNetworkApi'

// TODO should we scope this? this the right place to put it?
let updatedState

const getState = () => updatedState

function getWeb3Api(state, dispatch) {
  updatedState = state
  const api = {
    ...generateWeb3ReduxApi(dispatch, getState),
    networks: Object.keys(state.networks).reduce((o, networkId) => {
      return {
        ...o,
        [networkId]: generateNetworkApi({ networkId, getState, dispatch })
      }
    }, {}),
  };
  api.web3 = id => (api.networks[id] || {}).web3
  return api
}

export const mapStateToProps = (state) => ({ web3Redux: state.web3Redux })
export const mapDispatchToProps = (dispatch) => ({ dispatch })

export function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch, ...customActions } = dispatchProps
  return {
    ...stateProps,
    ...ownProps,
    ...customActions,
    web3Redux: getWeb3Api(stateProps.web3Redux, dispatch),
  }
}

export function web3Connect(connect, Component) {
  return connect(mapStateToProps, mapDispatchToProps, mergeProps)(Component)
}