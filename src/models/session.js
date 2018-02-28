import { DEFAULT_SESSION_ID } from 'helpers/constants';

let signingDeferred;

export default {
  namespace: 'session',

  state: {},

  effects: {
    * showTxSigningModal ({ payload }, { put }) {
      if (signingDeferred && signingDeferred.pending) return new Error('Already Signing a Transaction');
      yield put({ type: 'session/updateSession', payload: { signingModalData: payload } });
      signingDeferred = new Deferred();
      signingDeferred.pending = true;
      return signingDeferred;
    },
  },

  reducers: {
    createDefaultSession (state) {
      return { ...state, [DEFAULT_SESSION_ID]: { id: DEFAULT_SESSION_ID } }
    },

    updateSession (state, { payload }) {
      return { ...state, [DEFAULT_SESSION_ID]: { id:  DEFAULT_SESSION_ID, ...payload } }
    },
  },
}
