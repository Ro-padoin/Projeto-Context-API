import React from 'react';
import PropTypes from 'prop-types';

function ButtonFiltrar({ children, createNumericValueFilter, filterNumeric }) {
  return (
    <button
      className="button"
      data-testid="button-filter"
      onClick={ (e) => {
        e.preventDefault();
        createNumericValueFilter(filterNumeric);
      } }
      type="submit"
    >
      { children }
    </button>
  );
}

ButtonFiltrar.propTypes = {
  children: PropTypes.string,
  createNumericValueFilter: PropTypes.func,
  filterNumeric: PropTypes.func,
}.isRequired;

export default ButtonFiltrar;
