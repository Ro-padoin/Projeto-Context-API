import React, { memo } from 'react';
import PropTypes from 'prop-types';

function Th({ children, key }) {
  return (
    <th key={ key }>{ children }</th>
  );
}

Th.propTypes = {
  children: PropTypes.string,
  key: PropTypes.string,
}.isRequired;

export default memo(Th);
