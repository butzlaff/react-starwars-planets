import React, { useContext, useEffect, useState } from 'react';
import { PlanetsContext } from '../context/PlanetsProvider';
import './Table.css';

function Table() {
  const { planetData } = useContext(PlanetsContext);
  const [filterPlanets, setFilterPlanets] = useState();
  const [filterName, setFilterName] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filters, setFilters] = useState({
    filterColunm: 'population',
    operator: 'maior que',
    operatorValue: '0',
  });

  useEffect(() => {
    const handlePlanets = () => {
      setFilterPlanets(planetData);
    };
    handlePlanets();
  }, [planetData]);

  const handleChangePlanets = ({ target }) => {
    setFilterName(target.value);
    const data = planetData.filter(({ name }) => name
      .includes(filterName));
    setFilterPlanets(data);
  };

  useEffect(() => {
    const handleFilterName = () => {
      const data = planetData.filter(({ name }) => name
        .includes(filterName));
      setFilterPlanets(data);
    };
    handleFilterName();
  }, [filterName, planetData]);

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

  const filterOperator = ['maior que',
    'menor que',
    'igual a'];

  const filterData = () => {
    const { filterColunm, operator, operatorValue } = filters;
    setFilteredPlanets((prevState) => [...prevState, { ...filters }]);
    let planets = [];
    if (filteredPlanets.length > 0) {
      planets = filterPlanets.map((item) => item);
    } else {
      planets = planetData.map((item) => item);
    }
    const filtered = planets.filter((planet) => {
      if (operator === 'maior que') {
        return (+planet[filterColunm]) > (+operatorValue);
      } if (operator === 'menor que') {
        return (+planet[filterColunm]) < (+operatorValue);
      }
      return (+planet[filterColunm]) === (+operatorValue);
    });
    setFilterPlanets(filtered);
  };

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ handleChangePlanets }
        value={ filters.filterName }
        name="filterName"
      />
      <div>
        <label>
          Coluna:
          <select
            data-testid="column-filter"
            type="text"
            onChange={ handleChange }
            value={ filters.filterColunm }
            name="filterColunm"
          >
            { filterSelect.map((fill) => (<option key={ fill }>{ fill }</option>))}
          </select>
        </label>
        <label>
          Operador:
          <select
            data-testid="comparison-filter"
            type="text"
            onChange={ handleChange }
            value={ filters.operator }
            name="operator"
          >
            { filterOperator.map((fill) => (<option key={ fill }>{ fill }</option>))}
          </select>
        </label>
        <input
          data-testid="value-filter"
          type="text"
          onChange={ handleChange }
          value={ filters.operatorValue }
          name="operatorValue"
        />
        <button data-testid="button-filter" onClick={ filterData }>Filtrar</button>
      </div>
      <div className="filters">
        {filteredPlanets.map((filter) => (
          <div key={ filter.filterColunm }>
            <span>{filter.filterColunm}</span>
            <span>{filter.operator}</span>
            <span>{filter.operatorValue}</span>
            <button>Delete</button>
          </div>
        ))}
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
