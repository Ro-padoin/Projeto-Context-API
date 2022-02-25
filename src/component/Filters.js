import React, { useContext } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';
import Select from './Select';

const optionsColumnFilter = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];

const optionsComparisonFilter = ['maior que', 'menor que', 'igual a'];

function Filters() {
  const { handleFilterInputByName, filterByName,
    column, comparison, value,
    handleFilters, handleFilterNumeric } = useContext(PlanetsContext);

  return (
    <section>
      <label htmlFor="filter">
        Filtre os planetas pelo nome:
        <input
          type="text"
          id="filter"
          data-testid="name-filter"
          value={ filterByName }
          onChange={ handleFilterInputByName }
        />
      </label>
      <Select
        dataTestid="column-filter"
        id="column"
        name="column"
        handleChange={ handleFilters }
        value={ column }
        options={ optionsColumnFilter }
      />
      <Select
        dataTestid="comparison-filter"
        id="comparison"
        name="comparison"
        handleChange={ handleFilters }
        value={ comparison }
        options={ optionsComparisonFilter }
      />
      <label htmlFor="value-filter">
        <input
          type="number"
          id="value-filter"
          name="value"
          data-testid="value-filter"
          value={ value }
          onChange={ handleFilters }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleFilterNumeric }
      >
        Filtrar
      </button>
    </section>
  );
}

export default Filters;
