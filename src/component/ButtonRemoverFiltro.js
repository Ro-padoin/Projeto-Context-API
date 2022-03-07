import React from 'react';
import PropTypes from 'prop-types';

function ButtonRemoverFiltro({ children, reCreateOptionsColumn, column, removeFilter }) {
  return (
    <button
      className="button-delete"
      onClick={ (e) => {
        e.preventDefault();
        reCreateOptionsColumn(column);
        removeFilter(column);
      } }
      type="submit"
    >
      { children }
    </button>
  );
}

ButtonRemoverFiltro.propTypes = {
  children: PropTypes.string,
  column: PropTypes.string,
  reCreateOptionsColumn: PropTypes.func,
  removeFilter: PropTypes.func,
}.isRequired;

export default ButtonRemoverFiltro;
