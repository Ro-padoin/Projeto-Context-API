import React from 'react';
import PropTypes from 'prop-types';

function ButtonOrdenar({ children, createTableSort, order }) {
  return (
    <button
      className="button"
      data-testid="column-sort-button"
      onClick={ (e) => {
        e.preventDefault();
        createTableSort(order);
      } }
      type="button"
    >
      { children }
    </button>
  );
}

ButtonOrdenar.propTypes = {
  children: PropTypes.string,
  createTableSort: PropTypes.func,
}.isRequired;

export default ButtonOrdenar;
