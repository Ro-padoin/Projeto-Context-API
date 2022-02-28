import PropTypes from 'prop-types';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import fetchPlanetsAPI from '../apiService/fetchPlanetsAPI';

export const PlanetsContext = createContext();
function PlanetsProvider({ children }) {
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumbericValues, setFilterByNumericValues] = useState([]);

  async function fetchPlanets() {
    const planets = await fetchPlanetsAPI();
    const results = planets.results.filter((item) => delete item.residents);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByNumbericValues]);

  useEffect(() => {
    fetchPlanets();
  }, []);

  const contextValue = {
    createNumericValueFilter,
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
