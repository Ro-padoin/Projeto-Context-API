import React, { useContext, useEffect, useState } from 'react';
import '../style/filters.css';
import { PlanetsContext } from '../context/PlanetsContext';
import Select from './Select';

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
    <form>
      <section className="box-filters-name-e-numeric">
        <div>
          <label htmlFor="filter">
            <span className="span-filter">Filtro por nome: </span>
            <input
              className="filter-name"
              id="filter"
              onChange={ handleFilterInputByName }
              value={ filterByName }
              size="40"
              type="text"
            />
          </label>
        </div>
        <div className="box-filter-numeric">
          <span className="span-filter">Filtro por modalidade: </span>
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
              className="filter-numeric"
              data-testid="value-filter"
              id="value-filter"
              name="value"
              onChange={
                ({ target: { value } }) => setFilterNumeric((prevState) => (
                  { ...prevState, value }))
              }
              size=""
              type="number"
              value={ filterNumeric.value }
            />
          </label>
          <button
            className="button"
            data-testid="button-filter"
            onClick={ (e) => {
              e.preventDefault();
              createNumericValueFilter(filterNumeric);
            } }
            type="submit"
          >
            Filtrar
          </button>
        </div>
      </section>

      <section className="box-individual-filter">
        {filterByNumbericValues.length !== 0
        && filterByNumbericValues.map(({ column, comparison, value }, i) => (

          <>
            <div
              className="individual-filter"
              data-testid="name-filter"
              key={ `${column} + ${i}` }
            >
              <p>
                {column}
                {' '}
                {comparison}
                {' '}
                {value}
              </p>
            </div>
            <div>
              <button
                className="button-delete"
                onClick={ (e) => {
                  e.preventDefault();
                  reCreateOptionsColumn(column);
                  removeFilter(column);
                } }
                type="submit"
              >
                X
              </button>
            </div>

          </>
        ))}
      </section>
      <div className="box-individual-filter">
        <button
          className="button"
          data-testid="button-remove-filters"
          onClick={ (e) => {
            e.preventDefault();
            removeAllFilters();
          } }
          type="submit"
        >
          Limpar filtros
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

        <label
          htmlFor="sort-radio"
          onChange={
            ({ target: { value } }) => setOrder((prevState) => (
              { ...prevState, sort: value }))
          }
        >
          <input
            className="radio-button"
            data-testid="column-sort-input-asc"
            id="sort-radio"
            name="sortTable"
            type="radio"
            value="ASC"
          />
          <span className="span-filter">ASC</span>
          <input
            className="radio-button"
            data-testid="column-sort-input-desc"
            id="sort-radio"
            name="sortTable"
            type="radio"
            value="DESC"
          />
          <span className="span-filter">DESC</span>
        </label>

        <button
          className="button"
          data-testid="column-sort-button"
          onClick={ (e) => {
            e.preventDefault();
            createTableSort(order);
          } }
          type="button"
        >
          Ordenar
        </button>
      </div>
    </form>
  );
}

export default Filters;
