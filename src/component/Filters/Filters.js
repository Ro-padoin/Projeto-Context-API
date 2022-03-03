import React, { useContext, useEffect, useState } from 'react';
import { PlanetsContext } from '../../context/PlanetsContext';
import Select from '../Select';
import FilterName from './FilterName';

const optionsComparisonFilter = ['maior que', 'menor que', 'igual a'];
const optionsColumnFilter = ['population',
  'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

function Filters() {
  const {
    createNumericValueFilter,
    createTableSort,
    filterByName,
    filterByNumbericValues,
    handleFilterInputByName,
    removeAllFilters,
    removeFilter,
  } = useContext(PlanetsContext);

  const [filterNumeric, setFilterNumeric] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const [optionsColumn, setOptionsColumn] = useState(
    optionsColumnFilter,
  );

  const [order, setOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });

  function reCreateOptionsColumn(column) {
    const verifyOptions = optionsColumn.some((item) => item.includes(column));
    if (!verifyOptions) {
      setOptionsColumn((prevState) => [...prevState, column]);
    }
  }

  useEffect(() => {
    const newOptionsColumn = optionsColumn.filter((option) => filterByNumbericValues
      .every((filter) => option !== filter.column));
    setOptionsColumn(newOptionsColumn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByNumbericValues]);

  return (
    <form onSubmit={ (e) => e.preventDefault() }>
      <div>
        <FilterName
          filterByName={ filterByName }
          handleFilterInputByName={ handleFilterInputByName }
        />
      </div>
      <div>
        <Select
          id="column"
          name="column"
          handleChange={
            ({ target: { value } }) => setFilterNumeric((prevState) => (
              { ...prevState, column: value }))
          }
          value={ filterNumeric.column }
          options={ optionsColumn }
        />
        <Select
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
            onChange={
              ({ target: { value } }) => setFilterNumeric((prevState) => (
                { ...prevState, value }))
            }
            value={ filterNumeric.value }
          />
        </label>
        <button
          type="submit"
          onClick={ createNumericValueFilter(filterNumeric) }
        >
          Filtrar
        </button>
      </div>

      <div>
        {filterByNumbericValues.length !== 0
        && filterByNumbericValues.map(({ column, comparison, value }, i) => {
          let comparisonLabel = '>';
          if (comparison === 'menor que') comparisonLabel = '<';
          if (comparison === 'igual a') comparisonLabel = '===';
          return (
            <div key={ `${column} + ${i}` } data-testid="filter">
              <p>
                {column}
                {' '}
                {comparisonLabel}
                {' '}
                {value}
              </p>
              <button
                type="submit"
                onClick={ () => {
                  reCreateOptionsColumn(column);
                  removeFilter(column);
                } }
              >
                X

              </button>
            </div>
          );
        })}
      </div>
      <div>
        <button
          type="submit"
          data-testid="button-remove-filters"
          onClick={ removeAllFilters() }
        >
          Remover todas filtragens
        </button>
      </div>
      <div>
        <Select
          id="column-sort"
          name="column-sort"
          options={ optionsColumnFilter }
          handleChange={
            ({ target: { value } }) => setOrder((prevState) => (
              { ...prevState, column: value }))
          }
          value={ order.column }
        />

        <label
          htmlFor="sort-radio"
          onChange={
            ({ target: { value } }) => setOrder((prevState) => (
              { ...prevState, sort: value }))
          }
        >
          <input
            type="radio"
            id="sort-radio"
            name="sortTable"
            value="ASC"
          />
          ASC
          <input
            type="radio"
            id="sort-radio"
            name="sortTable"
            value="DESC"
          />
          DESC
        </label>

        <button
          type="button"
          onClick={ createTableSort(order) }
        >
          Ordenar
        </button>
      </div>
    </form>
  );
}

export default Filters;
