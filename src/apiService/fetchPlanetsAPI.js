const ENDPOINT_PLANETS = ' https://swapi-trybe.herokuapp.com/api/planets/';

const fetchPlanetsAPI = async () => {
  const response = await fetch(ENDPOINT_PLANETS);
  const data = await response.json();
  return data;
};

export default fetchPlanetsAPI;
