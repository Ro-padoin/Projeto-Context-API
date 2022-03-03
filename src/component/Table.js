import React, { useContext } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';
import Filters from './Filters';
import Th from './Th';

function Table() {
  const { data } = useContext(PlanetsContext);

  const titles = ['Nome', 'Rotation Period', 'Orbital Period', 'Diameter',
    'Climate', 'Gravity', 'Terrain', 'Surface Water', 'Population',
    'Films', 'Created', 'Edited', 'URL'];

  return (
    <>
      <section>
        <Filters />
      </section>
      <table>
        <thead>
          <tr>
            { titles.map((title, i) => (
              <Th key={ i }>{title}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length !== 0 && data.map((planet) => (
            <tr key={ planet.name }>
              <td data-testid="planet-name">{planet.name}</td>
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
