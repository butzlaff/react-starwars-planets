import React, { useContext, useState } from 'react';
import { PlanetsContext } from '../context/PlanetsProvider';
import './Table.css';

function Table() {
  const { planetData } = useContext(PlanetsContext);

  const [filters, setFilters] = useState({
    filterName: '',
    filterColunm: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const filterSelect = ['population',
    'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  const filterPlanets = planetData.filter(({ name }) => name
    .includes(filters.filterName));

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ handleChange }
        value={ filters.filterName }
        name="filterName"
      />
      <div>
        <label>
          Coluna:
          <select
            data-testid="name-filter"
            type="text"
            onChange={ handleChange }
            value={ filters.filterColunm }
            name="filterColunm"
          >
            { filterSelect.map((fill) => (<option key={ fill }>{ fill }</option>))}
          </select>
        </label>
      </div>
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
              <td className="table__cell">{ planet.name }</td>
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

export default Table;
