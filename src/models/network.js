export default {
  namespace: 'network',

  state: {},

  reducers: {
    createNetwork (state, { payload }) {
      return {...state, [payload.id]: { ...payload }}
    },

    updateNetwork (state, { payload }) {
      return {...state, [payload.id]: { ...payload }}
    },

    deleteNetwork (state, { payload }) {
      return state.filter(({ id }) => id !== payload.id);
    },
  },
}
