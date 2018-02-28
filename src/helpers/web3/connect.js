import { connect } from 'dva';
import { web3Connect } from 'helpers/web3Redux';

export default function (WrappedComponent) {
  return web3Connect(connect, WrappedComponent);
}