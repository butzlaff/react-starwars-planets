import React from 'react';
import PropTypes from 'prop-types';
import './Table.css';

function Table({ filterPlanets }) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th className="table__header">Name</th>
            <th className="table__header">Rotation Period</th>
            <th className="table__header">Orbital Period</th>
            <th className="table__header">Diameter</th>
            <th className="table__header">Climate</th>
            <th className="table__header">Gravity</th>
            <th className="table__header">Terrain</th>
            <th className="table__header">Surface Water</th>
            <th className="table__header">Population</th>
            <th className="table__header">Films</th>
            <th className="table__header">Created</th>
            <th className="table__header">Edited</th>
            <th className="table__header">Url</th>
          </tr>
        </thead>
        <tbody>
          { filterPlanets?.map((planet) => (
            <tr className="table__row" key={ planet.name }>
              <td data-testid="planet-name" className="table__cell">{ planet.name }</td>
              <td className="table__cell">{ planet.rotation_period }</td>
              <td className="table__cell">{ planet.orbital_period }</td>
              <td className="table__cell">{ planet.diameter }</td>
              <td className="table__cell">{ planet.climate }</td>
              <td className="table__cell">{ planet.gravity }</td>
              <td className="table__cell">{ planet.terrain }</td>
              <td className="table__cell">{ planet.surface_water }</td>
              <td className="table__cell">{ planet.population }</td>
              <td className="table__cell">
                { planet.films.map((film) => (
                  <p key={ film }>{ film }</p>)) }
              </td>
              <td className="table__cell">{ planet.created }</td>
              <td className="table__cell">{ planet.edited }</td>
              <td className="table__cell">{ planet.url }</td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  filterPlanets: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Table;
