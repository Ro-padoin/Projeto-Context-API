import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanetsAPI from '../apiService/fetchPlanetsAPI';

export const PlanetsContext = createContext();

function PlanetsProvider({ children }) {
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filterNumeric, setFilterNumeric] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
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

  function checkConditionsToFilterByNumericValues() {
    const { column, comparison, value } = filterNumeric;

    const newData = data
      .filter((planet) => {
        if (comparison === 'maior que') return Number(planet[column]) > Number(value);
        if (comparison === 'menor que') return Number(planet[column]) < Number(value);
        if (comparison === 'igual a') return Number(planet[column]) === Number(value);
        return null;
      });
    setData(newData);
  }

  function handleFilters({ target: { value, name } }) {
    const newFilterNumeric = { ...filterNumeric };
    newFilterNumeric[name] = value;
    setFilterNumeric(newFilterNumeric);
    setFilterByNumericValues([newFilterNumeric]);
  }

  function handleFilterInputByName({ target }) {
    setFilterByName(target.value);
    checkConditionsToFilterByName(target.value);
  }

  useEffect(() => {
    fetchPlanets();
  }, []);

  const contextValue = {
    data,
    filterByName,
    column: filterNumeric.column,
    comparison: filterNumeric.comparison,
    value: filterNumeric.value,
    filterByNumbericValues,
    handleFilterInputByName,
    handleFilters,
    handleFilterNumeric: checkConditionsToFilterByNumericValues,
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
