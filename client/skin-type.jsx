/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable react/react-in-jsx-scope */

import React from 'react';
import {CellBody, CellHeader, Checkbox, FormCell} from 'react-weui';

/**
 * Component for a single skin type option
 * Conditionally renders an indicator if this item is selected
 */

const MenuItem = ({label, value, checked, addMenuItem, removeMenuItem}) => {
  const toggle = checked ? removeMenuItem : addMenuItem;

  return (
    <FormCell
      checkbox
      key={value}
    >
      <CellHeader>
        <Checkbox
          name={value}
          value={value}
          defaultChecked={checked}
          onClick={() => toggle(value)}
        />
      </CellHeader>

      <CellBody>{label}</CellBody>
    </FormCell>
  );
};

MenuItem.propTypes = {
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  checked: React.PropTypes.bool.isRequired,
  addMenuItem: React.PropTypes.func.isRequired,
  removeMenuItem: React.PropTypes.func.isRequired,
};

export default MenuItem;
