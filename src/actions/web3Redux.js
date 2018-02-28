import { networkApis } from 'helpers/web3Redux/generateNetworkApi';

export function decorateTransactionArgs({ args = [], networkId }) {
  const { getDefaultAddress } = networkApis[networkId];
  // if getter isn't set, do nothign
  if (!getDefaultAddress) {
    return args;
  }
  // if the last argument already sets `from`, do nothing
  const lastArg = args[args.length - 1] || {};
  if (lastArg.from) {
    return args;
  }
  // if the default address isn't gettable
  const from = getDefaultAddress();
  if (!from) {
    return args;
  }
  // if the last argument isn't an object (or is a big number), concat the `from`
  if (typeof lastArg !== 'object' || (lastArg.constructor && lastArg.constructor.name === 'BigNumber')) {
    return args.concat([{ from }]);
  }
  // otherwise, merge `from` into the last arg
  const web3Params = { ...lastArg, from };

  // ensure we don't attach undefined args
  const { nonce, gasPrice, gas, ...sanitized } = web3Params;
  if (nonce) { sanitized.nonce = nonce; }
  if (gasPrice) { sanitized.gasPrice = gasPrice; }
  if (gas) { sanitized.gas = gas; }

  return args.slice(0, -1).concat([sanitized]);
}

function callMethod({ method, args, networkId, transaction }, callback) {
  const decoratedArgs = transaction ? decorateTransactionArgs({ args, networkId }) : args;
  return (dispatch) => {
    dispatch({ type: 'web3Redux/xhr', networkId, count: 1 });
    return new Promise((resolve, reject) => {
      try {
        method(...decoratedArgs, (err, value) => {
          if (err) {
            dispatch({ type: 'web3Redux/xhr', networkId, count: -1 });
            return reject(err);
          }
          dispatch({ type: 'web3Redux/xhr', networkId, count: -1 });
          callback({ dispatch, value });
          return resolve(value);
        });
      } catch (err) {
        dispatch({ type: 'web3Redux/xhr', networkId, count: -1 });
        reject(err);
      }
    });
  };
}

export function web3Method({ method, networkId, args, key }) {
  return callMethod({ method, args, networkId }, ({ dispatch, value }) => {
    dispatch({ type: 'web3Redux/web3MethodSuccess', networkId, key, payload: { value, updated: new Date() } });
  });
}

export function getTransaction({ args, method, networkId }) {
  return callMethod({ method, args, networkId }, ({ dispatch, value }) => {
    dispatch({ type: 'web3Redux/transactionUpdated', networkId, key: args[0], payload: { value, updated: new Date() } });
  });
}

export function createTransaction({ args, method, networkId }) {
  return callMethod({ method, args, networkId, transaction: true }, ({ dispatch, value }) => {
    dispatch({ type: 'web3Redux/transactionUpdated', networkId, key: value, payload: { created: new Date() } });
  });
}

export function callContractMethod({ networkId, key, args, address, method }) {
  return callMethod({ method, args, networkId }, ({ dispatch, value }) => {
    dispatch({ type: 'web3Redux/contractMethodSuccess', address, networkId, key, payload: { value, updated: new Date() } });
  });
}
export function createContractTransaction({ networkId, args, address, method }) {
  return callMethod({ method, args, networkId, transaction: true }, ({ dispatch, value }) => {
    dispatch({ type: 'web3Redux/transactionUpdated', networkId, key: value, payload: { created: new Date() } });
    dispatch({ type: 'web3Redux/contractTransactionCreated', address, networkId, payload: { value } }); // relational
  });
}