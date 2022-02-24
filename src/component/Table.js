import React, { useContext } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';

function Table() {
  const { data, handleFilterInputByName, filterByName } = useContext(PlanetsContext);

  return (
    <>
      <section>
        <label htmlFor="filter">
          Filtre os planetas pelo nome:
          <input
            type="text"
            id="filter"
            name="filterPlanetName"
            data-testid="name-filter"
            value={ filterByName }
            onChange={ handleFilterInputByName }
          />
        </label>
      </section>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {data.length !== 0 && data.map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>
                {planet.films.map((film, i) => (
                  <p key={ i }>
                    {film}
                  </p>))}
              </td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
