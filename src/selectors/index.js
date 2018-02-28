// import { schema } from '~/models';
import isEqual from 'lodash/isEqual'
import orderBy from 'lodash/orderBy'
import { createSelectorCreator, defaultMemoize } from 'reselect'
// import { createSelector as createOrmSelector } from 'redux-orm';

export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
);

// export const ormSelector = state => state.orm;

export const entitiesSelector = type => state => state[type]
export const entitiesArraySelector = type => createDeepEqualSelector(
  [entitiesSelector(type)],
  entities => Object.keys(entities).map(id => entities[id])
)

export const getNetworks = entitiesArraySelector('network')

// export const getNetworksWithTokens = createDeepEqualSelector(
//   ormSelector,
//   createOrmSelector(schema, session =>
//     session.Network.all().toModelArray().map(network => ({
//       ...network.ref, tokens: network.tokens.all().toRefArray(),
//     }),
//   )),
// );

// export const getDefaultNetworks = createDeepEqualSelector(
//   ormSelector,
//   createOrmSelector(schema, session =>
//     session.Network.filter({ default: true }).toModelArray().map(({ id }) => id),
//   ),
// );

// export const getKeystoreTypes = createDeepEqualSelector(
//   ormSelector,
//   createOrmSelector(schema, session =>
//     session.KeystoreType.all().toRefArray(),
//   ),
// );

// export const getKeystores = createDeepEqualSelector(
//   ormSelector,
//   createOrmSelector(schema, (session) => {
//     const { defaultAddress } = session.Session.first() || {};
//     return session.Keystore.all().toModelArray().map((keystore) => {
//       const addresses = keystore.addresses.all().toModelArray().map((address) => {
//         const networks = address.networks.all().toRefArray();
//         const networkIds = networks.map(({ id }) => id);
//         if (!address.ref) { return null; }
//         const isDefault = defaultAddress && address.ref.address === defaultAddress.address;
//         return {
//           ...address.ref,
//           isDefault,
//           networks,
//           tokens: address.tokens.all().toModelArray().map(token => ({
//             ...token.ref,
//             network: token.network.ref,
//             networkEnabled: networkIds.indexOf(token.ref.network) >= 0,
//           })),
//         };
//       }).filter(a => a);
//       return {
//         ...keystore.ref, addresses, type: keystore.type.ref,
//       };
//     });
//   }),
// );

// export const getTokens = createDeepEqualSelector(
//   ormSelector,
//   createOrmSelector(schema, session =>
//     session.Token.all().orderBy('name').toModelArray().map(token => ({
//       ...token.ref,
//       network: token.network.ref,
//     }),
//   )),
// );

export const getAddresses = createDeepEqualSelector(
  [entitiesSelector('session'), entitiesArraySelector('address')],
  (sessions, addresses) => {
    const { defaultAddress } = Object.values(sessions)[0] || {};
    return orderBy(addresses, 'name', 'asc').map((address) => {
      const ref = address.ref;
      return {
        ...ref,
        isDefault: defaultAddress && defaultAddress.address === ref.address,
        keystore: {
          ...address.keystore.ref,
          type: { ...address.keystore.type.ref },
        },
      };
    });
  }
);

export const getDefaultAddress = createDeepEqualSelector(
  [entitiesSelector('session')],
  (sessions) => {
    const { defaultAddress } = Object.values(sessions)[0] || {};
    return defaultAddress && defaultAddress.ref;
  },
);

// export const getSigningModalData = createDeepEqualSelector(
//   ormSelector,
//   createOrmSelector(schema, session => (session.Session.first() || {}).signingModalData),
// );