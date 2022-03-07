import React from 'react';
import PropTypes from 'prop-types';

function ButtonLimparFiltros({ children, removeAllFilters }) {
  return (
    <button
      className="button"
      onClick={ (e) => {
        e.preventDefault();
        removeAllFilters();
      } }
      type="submit"
    >
      { children }
    </button>
  );
}

ButtonLimparFiltros.propTypes = {
  children: PropTypes.string,
  removeAllFilters: PropTypes.func,
}.isRequired;

export default ButtonLimparFiltros;
