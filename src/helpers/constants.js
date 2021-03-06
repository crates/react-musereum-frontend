/* eslint-disable max-len */
export const JSON_BACKUP_VERSION = '0.0.1';
export const REDUX_PREFIX = 'MUSEREUM';
export const LEDGER_ETH_KD_PATH = "44'/60'/0'/";
/* eslint-disable */
export const ERC20_ABI = [{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"_who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}];
/* eslint-enable */
export const SUI_COLORS = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];
export const IPFS_GATEWAY = 'https://ipfs.infura.io/ipfs/';
export const IPFS_API_CONFIG = { host: 'ipfs.infura.io', port: '5001', protocol: 'https' };
// SEED DATA
export const DEFAULT_SESSION_ID = 'main';

export const DEFAULT_NETWORKS = [
  {
    name: 'Ethereum',
    symbol: 'ETH',
    description: 'Official Ethereum Mainnet',
    provider: 'https://mainnet.infura.io',
    id: 'eth-mainnet',
    color: 'violet',
    chainId: 1,
    enabled: true,
    default: true,
    explorerAddressPrefix: 'https://etherscan.io/address/',
    explorerBlockPrefix: 'https://etherscan.io/block/',
    explorerTransactionPrefix: 'https://etherscan.io/tx/',
  },
  {
    name: 'Kovan',
    symbol: 'KETH',
    description: 'Kovan PoA Testnet',
    provider: 'https://kovan.infura.io/',
    id: 'eth-kovan',
    color: 'pink',
    enabled: false,
    default: false,
    chainId: 42,
    explorerAddressPrefix: 'https://kovan.etherscan.io/address/',
    explorerBlockPrefix: 'https://kovan.etherscan.io/block/',
    explorerTransactionPrefix: 'https://kovan.etherscan.io/tx/',
  },
  {
    name: 'Ethereum Classic',
    symbol: 'ETC',
    description: 'Old Unforked Chain',
    provider: 'https://mewapi.epool.io/',
    id: 'etc-mainnet',
    chainId: 61,
    color: 'green',
    enabled: false,
    default: false,
    explorerAddressPrefix: 'https://gastracker.io/addr/',
    explorerBlockPrefix: 'https://gastracker.io/block/',
    explorerTransactionPrefix: 'https://gastracker.io/tx/',
  },
  {
    name: 'TestRPC',
    symbol: 'ETH-testrpc',
    description: 'Local Virtual Test Chain',
    provider: 'http://localhost:6545',
    id: 'testrpc',
    color: 'blue',
    chainId: -1,
    enabled: false,
    default: false,
  },
  {
    name: 'Ropsten Testnet',
    symbol: 'ETH-ropsten',
    description: 'Etheruem Public Testnet',
    provider: 'https://ropsten.infura.io',
    id: 'eth-ropsten',
    color: 'teal',
    chainId: 3,
    enabled: false,
    default: false,
    explorerAddressPrefix: 'https://testnet.etherscan.io/address/',
    explorerBlockPrefix: 'https://testnet.etherscan.io/block/',
    explorerTransactionPrefix: 'https://testnet.etherscan.io/tx/',
  },
];

export const DEFAULT_KEYSTORE_TYPES = [
  {
    id: 'v3',
    name: 'Single Account',
    subtitle: 'v3 Encrypted Keystore',
    description: 'The standard "default" wallet used by Geth, Parity, and many other services',
    color: 'green',
    icon: 'key',
  },
  {
    id: 'ledger',
    name: 'Ledger Wallet',
    subtitle: 'Nano S (or blue) Hardware Wallet',
    description: 'Ethereum hardware wallet, based on robust safety features for storing cryptographic assets and securing digital payments. It connects to any computer via USB.',
    color: 'black',
    icon: 'usb',
  },
  {
    id: 'cold',
    name: 'Cold Accounts',
    subtitle: 'for Offline Signing / Read Only',
    description: 'Reference to an Ethereum address that allows for generating offline signing data, or simply checking account balances',
    color: 'blue',
    icon: 'hide',
  },
  {
    id: 'multisig',
    name: 'MultiSig Wallet',
    subtitle: 'Multi-party sigining for increased security',
    description: 'Assigns multiple other keystores to administer a contract that can execute transactions with a miniumum threashold of approvals',
    color: 'orange',
    icon: 'users',
  },
];

export const DEFAULT_TOKENS = [
  {
    address: '0x711c43c390263ff5444984f5a9a413ff473a6861',
    symbol: 'DGX-test',
    default: true,
    decimals: 9,
    network: 'eth-kovan',
    name: 'DGX Kovan',
    color: 'orange',
  }, {
    address: '0x1312f9ec97a2377c8e2ba6f088afdfedfe59398c',
    symbol: 'DGDR',
    decimals: 9,
    network: 'etc-mainnet',
    name: 'DGD ETC Redemption',
    color: 'olive',
  // }, {
  //   address: '0xAc709FcB44a43c35F0DA4e3163b117A17F3770f5',
  //   symbol: 'ARC',
  //   decimals: 18,
  //   network: 'eth-mainnet',
  //   name: 'Arcade City Tokens',
  //   color: 'violet',
  // }, {
  //   address: '0x74c1e4b8cae59269ec1d85d3d4f324396048f4ac',
  //   symbol: '🍺  ',
  //   decimals: 0,
  //   network: 'eth-mainnet',
  //   name: 'BeerCoin',
  //   color: 'orange',
  // }, {
  //   address: '0x1e797Ce986C3CFF4472F7D38d5C4aba55DfEFE40',
  //   symbol: 'BCDN',
  //   decimals: 15,
  //   network: 'eth-mainnet',
  //   name: 'BlockCDN',
  //   color: 'teal',
  // }, {
  //   address: '0xbb9bc244d798123fde783fcc1c72d3bb8c189413',
  //   symbol: 'DAO',
  //   decimals: 16,
  //   network: 'eth-mainnet',
  //   name: 'The DAO Tokens',
  //   color: 'red',
  // }, {
  //   address: '0x5c40eF6f527f4FbA68368774E6130cE6515123f2',
  //   symbol: 'DAO-extra',
  //   decimals: 0,
  //   network: 'eth-mainnet',
  //   name: 'The DAO extraBalance Tokens',
  //   color: 'grey',
  }, {
    address: '0xe0b7927c4af23765cb51314a0e0521a9645f0e2a',
    symbol: 'DGD',
    default: true,
    decimals: 9,
    network: 'eth-mainnet',
    name: 'DigixDAO Tokens',
    color: 'blue',
  // }, {
  //   address: '0x54bda709fed875224eae569bb6817d96ef7ed9ad',
  //   symbol: 'DGD-badge',
  //   decimals: 0,
  //   network: 'eth-mainnet',
  //   name: 'DigixDAO Proposer Badges',
  //   color: 'black',
  }, {
    address: '0xa74476443119A942dE498590Fe1f2454d7D4aC0d',
    symbol: 'GNT',
    decimals: 18,
    network: 'eth-mainnet',
    name: 'Golem Network Tokens',
    color: 'brown',
  // }, {
  //   address: '0xb582baaf5e749d6aa98a22355a9d08b4c4d013c8',
  //   symbol: 'HKG',
  //   decimals: 3,
  //   network: 'eth-mainnet',
  //   name: 'Hacker Gold',
  //   color: 'orange',
  }, {
    address: '0x888666CA69E0f178DED6D75b5726Cee99A87D698',
    symbol: 'ICN',
    decimals: 18,
    network: 'eth-mainnet',
    name: 'ICONOMI Tokens',
    color: 'black',
  }, {
    address: '0xc66ea802717bfb9833400264dd12c2bceaa34a6d',
    symbol: 'MKR',
    decimals: 18,
    network: 'eth-mainnet',
    name: 'MakerDAO Tokens',
    color: 'teal',
  // }, {
  //   address: '0xD8912C10681D8B21Fd3742244f44658dBA12264E',
  //   symbol: 'PLU',
  //   decimals: 18,
  //   network: 'eth-mainnet',
  //   name: 'Plutons',
  //   color: 'brown',
  }, {
    address: '0x48c80F1f4D53D5951e5D5438B54Cba84f29F32a5',
    symbol: 'REP',
    decimals: 18,
    network: 'eth-mainnet',
    name: 'Augur Rep',
    color: 'purple',
  }, {
    address: '0xaec2e87e0a235266d9c5adc9deb4b2e29b54d009',
    symbol: 'SNGLS',
    decimals: 0,
    network: 'eth-mainnet',
    name: 'SingularDTV Signals',
    color: 'red',
  // }, {
  //   address: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
  //   symbol: '🦄  ',
  //   decimals: 0,
  //   network: 'eth-mainnet',
  //   name: 'Unicorn',
  //   color: 'black',
  },
];