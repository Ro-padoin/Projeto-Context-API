import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanetsAPI from '../apiService/fetchPlanetsAPI';

export const PlanetsContext = createContext();

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);

  async function fetchPlanets() {
    const planets = await fetchPlanetsAPI();
    const results = planets.results.filter((item) => delete item.residents);
    setData(results);
  }

  useEffect(() => {
    fetchPlanets();
  }, []);

  const contextValue = {
    data,
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
