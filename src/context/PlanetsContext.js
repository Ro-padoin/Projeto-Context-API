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

  function createNumericValueFilter(filter) {
    setFilterByNumericValues((prevState) => [...prevState, filter]);
  }

  function createTableSort({ column, sort }) {
    setData((prevData) => [...prevData.sort((a, b) => {
      if (a[column] === 'unknown' && b[column] === 'unknown') return 0;
      if (a[column] === 'unknown') return 1;
      if (b[column] === 'unknown') return RESULT;
      if (sort === 'ASC') {
        return a[column] - b[column];
      }
      return b[column] - a[column];
    })]);
  }

  async function fetchPlanets() {
    const planets = await fetchPlanetsAPI();
    const results = planets.results.filter((item) => delete item.residents);
    results.sort((a, b) => a.name.localeCompare(b.name));
    setData([...results]);
    setOriginalData([...results]);
  }

  function handleFilterInputByName({ target }) {
    setFilterByName(target.value);
    createFilterByName(target.value);
  }

  function removeAllFilters() {
    setFilterByNumericValues([]);
    setData(originalData);
  }

  function removeFilter(column) {
    setFilterByNumericValues((prevState) => prevState.filter((item) => item
      .column !== column));
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
    createTableSort,
    data,
    filterByName,
    filterByNumbericValues,
    handleFilterInputByName,
    removeFilter,
    removeAllFilters,
    setData,
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
