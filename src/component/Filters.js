import React, { useContext, useState } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';
import Select from './Select';

const optionsColumnFilter = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];

const optionsComparisonFilter = ['maior que', 'menor que', 'igual a'];

function Filters() {
  const { handleFilterInputByName,
    filterByName, createNumericValueFilter } = useContext(PlanetsContext);

  const [filterNumeric, setFilterNumeric] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

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
        handleChange={
          ({ target: { value } }) => setFilterNumeric((prevState) => (
            { ...prevState, column: value }))
        }
        value={ filterNumeric.column }
        options={ optionsColumnFilter }
      />
      <Select
        dataTestid="comparison-filter"
        id="comparison"
        name="comparison"
        handleChange={
          ({ target: { value } }) => setFilterNumeric((prevState) => (
            { ...prevState, comparison: value }))
        }
        value={ filterNumeric.comparison }
        options={ optionsComparisonFilter }
      />
      <label htmlFor="value-filter">
        <input
          type="number"
          id="value-filter"
          name="value"
          data-testid="value-filter"
          onChange={
            ({ target: { value } }) => setFilterNumeric((prevState) => (
              { ...prevState, value }))
          }
          value={ filterNumeric.value }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ (e) => {
          e.preventDefault();
          createNumericValueFilter(filterNumeric);
        } }
      >
        Filtrar
      </button>
    </section>
  );
}

export default Filters;
