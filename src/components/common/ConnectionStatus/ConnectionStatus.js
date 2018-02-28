import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styled from 'styled-components'

import web3Connect from 'helpers/web3/connect'

import { getNetworks } from 'selectors'
import NetworkStatus from 'components/common/NetworkStatus'

const ConnectionBar = styled.div`
  height: 56px;
  align-items: center;
  display: flex;
`

class ConnectionStatus extends Component {

  static propTypes = {
    web3Redux: PropTypes.object.isRequired,
    networks: PropTypes.array.isRequired,
  }

  render() {
    const { web3Redux, networks } = this.props

    const items = networks.map((network) => {
      const web3 = web3Redux.web3(network.id)
      if (!network.enabled || !web3) return null
      return { network, web3 }
    }).filter(w => w)

    return (
      <ConnectionBar>
        {web3Redux.pendingRequests() &&
          'Loading'
        }
        <div>
          {items.map(props => <NetworkStatus key={props.network.id} {...props} name />)}
        </div>
      </ConnectionBar>
    )
  }
}

export default web3Connect(connect(state => ({ networks: getNetworks(state) }))(ConnectionStatus));