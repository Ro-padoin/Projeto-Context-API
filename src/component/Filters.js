import React, { useContext, useEffect, useState } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';
import Select from './Select';

const optionsComparisonFilter = ['maior que', 'menor que', 'igual a'];
const optionsColumnFilter = ['population',
  'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

function Filters() {
  const {
    createNumericValueFilter,
    createTableSortAsc,
    createTableSortDesc,
    order,
    setOrder,
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
        options={ optionsColumn }
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
        type="submit"
        data-testid="button-filter"
        onClick={ (e) => {
          e.preventDefault();
          createNumericValueFilter(filterNumeric);
        } }
      >
        Filtrar
      </button>

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
                onClick={ (e) => {
                  e.preventDefault();
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
          onClick={ (e) => {
            e.preventDefault();
            removeAllFilters();
          } }
        >
          Remover todas filtragens
        </button>
      </div>
      <div>
        <Select
          dataTestid="column-sort"
          id="column-sort"
          name="column-sort"
          options={ optionsColumnFilter }
          handleChange={
            ({ target: { value } }) => setOrder((prevState) => (
              { ...prevState, column: value }))
          }
          value={ order.column }
        />

        <label htmlFor="sort-radio">
          <input
            type="radio"
            id="sort-radio"
            data-testid="column-sort-input-asc"
            name="sortTable"
            value="ASC"
            onChange={
              ({ target: { value } }) => setOrder((prevState) => (
                { ...prevState, sort: value }))
            }
          />
          ASC
          <input
            type="radio"
            id="sort-radio"
            name="sortTable"
            data-testid="column-sort-input-desc"
            value="DESC"
            onChange={
              ({ target: { value } }) => setOrder((prevState) => (
                { ...prevState, sort: value }))
            }
          />
          DESC
        </label>

        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ (e) => {
            e.preventDefault();
            if (order.sort === 'ASC') {
              createTableSortAsc();
            }
            if (order.sort === 'DESC') {
              createTableSortDesc();
            }
          } }
        >
          Ordenar
        </button>
      </div>
    </section>
  );
}

export default Filters;
