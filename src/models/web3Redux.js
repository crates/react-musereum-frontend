import update from 'immutability-helper';
import { networkApis } from 'helpers/web3Redux/generateNetworkApi';
import { DEFAULT_SESSION_ID } from 'helpers/constants';

function removeWeb3(networkId) {
  if (networkApis[networkId]) {
    if (networkApis[networkId].web3) {
      networkApis[networkId].web3.reset();
    }
    delete networkApis[networkId];
  }
}

function updateNetwork(state, action, query) {
  const network = state.networks[action.networkId] || {
    web3Methods: {}, meta: {}, transactions: {}, contracts: {}
  };
  return { ...state, networks: { ...state.networks, [action.networkId]: update(network, query) } };
}

function updateTransaction(state, action, query) {
  const transactions = state.networks[action.networkId].transactions || {};
  const transaction = transactions[action.key] || {};
  return updateNetwork(state, action, {
    transactions: { $set: { ...transactions, [action.key]: update(transaction, query) } }
  });
}

function updateContract(state, action, query) {
  const contracts = state.networks[action.networkId].contracts || {};
  const contract = contracts[action.address] || { transactions: [], calls: {} };
  return updateNetwork(state, action, {
    contracts: { $set: { ...contracts, [action.address]: update(contract, query) } }
  });
}

export default {
  namespace: 'web3Redux',

  state: {
    networks: {},
    meta: {
      pending: 0,
    },
  },

  effects: {
    * setNetwork ({ networkId, web3, getDefaultAddress }, { put }) {
      removeWeb3(networkId);
      networkApis[networkId] = { web3, getDefaultAddress };
      return yield put({
        type: 'networkSetWeb3',
        networkId,
        payload: { enabled: !!web3, connecting: !!web3 }
      });
    },

    * updateNetwork ({ networkId, payload }, { put }) {
      return yield put({ type: 'networkSetWeb3', networkId, payload });
    },

    * removeNetwork ({ networkId }, { put }) {
      removeWeb3(networkId);
      return put({ type: 'networkRemoved', networkId });
    },
  },

  reducers: {
    xhr (state, action) {
      // total pending xhr requests; update network and total
      const pendingUpdate = { meta: { pending: { $apply: (n = 0) => n + action.count } } };
      const updatedState = updateNetwork(state, action, pendingUpdate);
      return update(updatedState, pendingUpdate);
    },

    networkRemoved (state) {
      const networks = { ...state.networks };
      delete networks[action.networkId];
      return { ...state, networks };
    },

    networkSetWeb3 (state, action) {
      return updateNetwork(state, action, { meta: { $merge: action.payload } });
    },

    web3MethodSuccess (state, action) {
      return updateNetwork(state, action, { web3Methods: { $merge: { [action.key]: action.payload } } });
    },

    transactionUpdated (state, action) {
      return updateTransaction(state, action, { $merge: action.payload });
    },

    contractMethodSuccess (state, action) {
      return updateContract(state, action, { calls: { $merge: { [action.key]: action.payload } } });
    },

    contractTransactionCreated (state, action) {
      return updateContract(state, action, { transactions: { $push: [action.payload.value] } });
    },
  },
}
