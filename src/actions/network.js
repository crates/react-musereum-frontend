import { validateProps } from 'helpers/validation';

import { sync } from 'helpers/web3';

const requiredProps = {
  name: true,
  symbol: true,
  description: true,
  provider: true,
  id: true,
  color: true,
  enabled: true,
  chainId: true,
};

// function dispatchAndSync(action) {
//   return (dispatch, getState) => {
//     dispatch(action)
//     sync({ dispatch, getState }, action.payload)
//   };
// }

function dispatchAndSync(action, store) {
  sync(store, action.payload)
  return action
}

export const createNetwork = (payload, store) => {
  validateProps(requiredProps, payload);
  return dispatchAndSync({ type: 'network/createNetwork', payload }, store);
};

export const updateNetwork = (payload) => {
  validateProps(requiredProps, payload);
  return dispatchAndSync({ type: 'network/updateNetwork', payload });
};

export const deleteNetwork = payload => (dispatch) => {
  dispatch({ type: 'web3Redux/removeNetwork', networkId: payload });
  dispatch({ type: 'network/deleteNetwork', payload });
};