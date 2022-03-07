import React, { useCallback, useContext, useEffect, useState } from 'react';
import ButtonRemoverFiltro from './ButtonRemoverFiltro';
import ButtonOrdenar from './ButtonOrdenar';
import '../style/filters.css';
import { PlanetsContext } from '../context/PlanetsContext';
import Select from './Select';
import ButtonFiltrar from './ButtonFiltrar';
import ButtonLimparFiltros from './ButtonLimparFiltros';

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

  const reCreateOptionsColumn = useCallback((column) => {
    const verifyOptions = optionsColumn.some((item) => item.includes(column));
    if (!verifyOptions) {
      setOptionsColumn((prevState) => [...prevState, column]);
    }
  }, [optionsColumn]);

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
          <ButtonFiltrar
            callBack={ createNumericValueFilter }
            param={ filterNumeric }
          >
            Filtrar
          </ButtonFiltrar>
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
              <ButtonRemoverFiltro
                reCreateOptionsColumn={ reCreateOptionsColumn }
                column={ column }
                removeFilter={ removeFilter }
              >
                X
              </ButtonRemoverFiltro>
            </div>

          </>
        ))}
      </section>
      <div className="box-individual-filter">
        <ButtonLimparFiltros
          removeAllFilters={ removeAllFilters }
        >
          Limpar Filtros
        </ButtonLimparFiltros>
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

        <ButtonOrdenar
          createTableSort={ createTableSort }
          order={ order }
        >
          Ordenar
        </ButtonOrdenar>
      </div>
    </form>
  );
}

export default Filters;
