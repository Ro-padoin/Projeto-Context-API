/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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

  function checkConditionsToFilterByName(value) {
    if (value.length !== 0) {
      const dataFilterName = data
        .filter((planet) => planet.name.toLowerCase().includes(value));
      setData(dataFilterName);
    } else {
      setData(originalData);
    }
  }

  function createNumericValueFilter(filter) {
    setFilterByNumericValues((prevState) => [...prevState, filter]);
  }

  function handleFilterInputByName({ target }) {
    setFilterByName(target.value);
    checkConditionsToFilterByName(target.value);
  }

  function createFilters(comparison, column, value) {
    const newData = data.filter((planet) => {
      if (comparison === 'maior que') return Number(planet[column]) > Number(value);
      if (comparison === 'menor que') return Number(planet[column]) < Number(value);
      if (comparison === 'igual a') return Number(planet[column]) === Number(value);
      return null;
    });
    setData(newData);
  }

  useEffect(() => {
    filterByNumbericValues.forEach(({ comparison, column, value }) => {
      createFilters(comparison, column, value);
    });
  }, [filterByNumbericValues]);

  useEffect(() => {
    fetchPlanets();
  }, []);

  const contextValue = {
    data,
    filterByName,
    createNumericValueFilter,
    handleFilterInputByName,
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
