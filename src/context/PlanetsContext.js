/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import fetchPlanetsAPI from '../apiService/fetchPlanetsAPI';

export const PlanetsContext = createContext();

const RESULT = -1;
function PlanetsProvider({ children }) {
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumbericValues, setFilterByNumericValues] = useState([]);
  const [order, setOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });

  function createTableSortAsc() {
    const { column } = order;
    const ordenateData = data.sort((a, b) => {
      if (a[column] === 'unknown' && b[column] === 'unknown') {
        return 0;
      }
      if (a[column] === 'unknown') {
        return 1;
      }
      if (b[column] === 'unknown') {
        return RESULT;
      }
      return a[column] - b[column];
    });
    setData(ordenateData);
  }

  function createTableSortDesc() {
    const { column } = order;
    const ordenateData = data.sort((a, b) => {
      if (a[column] === 'unknown' && b[column] === 'unknown') {
        return 0;
      }
      if (a[column] === 'unknown') {
        return RESULT;
      }
      if (b[column] === 'unknown') {
        return 1;
      }
      return b[column] - a[column];
    });
    setData(ordenateData);
  }

  async function fetchPlanets() {
    const planets = await fetchPlanetsAPI();
    const results = planets.results.filter((item) => delete item.residents);
    results.sort((j, k) => {
      if (j.population === 'unknown' && k.population === 'unknown') {
        return 0;
      }
      if (j.population === 'unknown') {
        return 1;
      }
      if (k.population === 'unknown') {
        return RESULT;
      }
      return j.population - k.population;
    });
    setData(results);
    setOriginalData(results);
  }

  function createFilterByName(value) {
    if (value.length !== 0) {
      const dataFilterName = data
        .filter((planet) => planet.name.toLowerCase().includes(value));
      setData(dataFilterName);
    } else {
      setData(originalData);
    }
  }

  const createMultipleNumericFilters = useCallback(() => {
    let newData = originalData;
    filterByNumbericValues.forEach(({ comparison, column, value }) => {
      newData = newData.filter((planet) => {
        if (comparison === 'maior que') return Number(planet[column]) > Number(value);
        if (comparison === 'menor que') return Number(planet[column]) < Number(value);
        return Number(planet[column]) === Number(value);
      });
    });
    setData(newData);
  }, [originalData, setData, filterByNumbericValues]);

  function removeFilter(column) {
    setFilterByNumericValues((prevState) => prevState.filter((item) => item
      .column !== column));
  }

  function removeAllFilters() {
    setFilterByNumericValues([]);
    setData(originalData);
  }

  function createNumericValueFilter(filter) {
    setFilterByNumericValues((prevState) => [...prevState, filter]);
  }

  function handleFilterInputByName({ target }) {
    setFilterByName(target.value);
    createFilterByName(target.value);
  }

  useEffect(() => {
    if (filterByNumbericValues.length !== 0) {
      createMultipleNumericFilters();
    } else {
      setData(originalData);
    }
  }, [filterByNumbericValues]);

  useEffect(() => {
    fetchPlanets();
  }, []);

  const contextValue = {
    createNumericValueFilter,
    createTableSortAsc,
    createTableSortDesc,
    data,
    filterByName,
    filterByNumbericValues,
    handleFilterInputByName,
    order,
    removeFilter,
    removeAllFilters,
    setData,
    setOrder,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.string,
}.isRequired;

export default PlanetsProvider;
