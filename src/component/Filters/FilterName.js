import React from 'react';
import PropTypes from 'prop-types';

function FilterName({ filterByName, handleFilterInputByName }) {
  return (
    <label htmlFor="filter">
      Filtre os planetas pelo nome:
      <input
        type="text"
        id="filter"
        value={ filterByName }
        onChange={ handleFilterInputByName }
      />
    </label>
  );
}

FilterName.propTypes = {
  filterByName: PropTypes.string,
  handleFilterInputByName: PropTypes.func,
}.isRequired;

export default FilterName;
