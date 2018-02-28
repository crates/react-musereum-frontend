import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getNetworks } from '~/selectors';
import DropdownSelector from '~/components/common/dropdown_selector';

class NetworkSelector extends Component {
  static propTypes = {
    name: PropTypes.string,
    showDisabled: PropTypes.bool,
    formChange: PropTypes.func,
    formData: PropTypes.object,
    onChange: PropTypes.func,
    networks: PropTypes.array.isRequired,
  }
  static defaultProps = {
    name: 'networkId',
    showDisabled: false,
    formChange: undefined,
    formData: undefined,
    onChange: undefined,
    networks: [],
  }
  render() {
    const { showDisabled, networks, onChange, formChange, formData, name } = this.props;
    if (!showDisabled) { networks = networks.filter(n => n.enabled); }
    if (networks.length === 0) { return <p>No Networks Available</p>; }
    return (
      <DropdownSelector
        defaultText="Select Network"
        items={networks}
        name={name}
        formData={formData}
        onChange={(network) => {
          if (onChange) onChange(network)
          if (formChange) formChange({ name, value: network.id })
        }}
      />
    );
  }
}

export default connect(s => ({ networks: getNetworks(s) }))(NetworkSelector);