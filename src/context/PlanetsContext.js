import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanetsAPI from '../apiService/fetchPlanetsAPI';

export const PlanetsContext = createContext();

function PlanetsProvider({ children }) {
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({ filterByName: '' });

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

  function handleFilterInputByName({ target }) {
    setFilter({ ...filter, filterByName: target.value });
    checkConditionsToFilterByName(target.value);
  }

  useEffect(() => {
    fetchPlanets();
  }, []);

  const contextValue = {
    data,
    setData,
    handleFilterInputByName,
    filterByName: filter.filterByName,
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
