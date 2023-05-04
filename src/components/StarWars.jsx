import React, { useContext, useEffect, useState, useCallback } from 'react';
import { PlanetsContext } from '../context/PlanetsProvider';
import Table from './Table';

function StarWars() {
  const { planetData } = useContext(PlanetsContext);
  const [filterPlanets, setFilterPlanets] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [order, setOrder] = useState({
    column: 'population',
    sort: null,
  });
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filters, setFilters] = useState({
    filterColunm: '',
    operator: '',
    operatorValue: '',
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

  const filterSelectInitial = ['population',
    'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  const [filterSelect, setFilterSelect] = useState(filterSelectInitial);

  const filterOperator = ['maior que',
    'menor que',
    'igual a'];

  const filterFilter = useCallback(() => {
    let newPlanetData = planetData.map((item) => item);
    filteredPlanets.forEach((filter) => {
      const planets = newPlanetData.filter((planet) => {
        if (filter.operator === 'maior que') {
          return +planet[filter.filterColunm] > +filter.operatorValue;
        } if (filter.operator === 'menor que') {
          return +planet[filter.filterColunm] < +filter.operatorValue;
        }
        return +planet[filter.filterColunm] === +filter.operatorValue;
      });
      newPlanetData = planets.map((item) => item);
    });
    setFilterPlanets(newPlanetData);
    const newSelect = filterSelect.map((item) => item);
    setFilters({
      filterColunm: newSelect[0],
      operator: 'maior que',
      operatorValue: '0',
    });
  }, [filteredPlanets, planetData, filterSelect]);

  useEffect(() => {
    filterFilter();
  }, [filterFilter, filteredPlanets]);

  const deleteFiltered = (item) => {
    const update = filteredPlanets.filter((filter) => filter.filterColunm !== item);
    setFilteredPlanets(update);
  };

  const deleteAllFilters = () => {
    setFilteredPlanets([]);
    setFilterSelect(filterSelectInitial);
  };

  const filterData = () => {
    const { filterColunm } = filters;
    const newSelect = filterSelect.filter((item) => item !== filterColunm);
    setFilteredPlanets((prevState) => [...prevState, { ...filters }]);
    setFilterSelect(newSelect);
  };

  const radios = ({ target }) => {
    if (target.name === 'order') {
      setOrder({
        ...order,
        sort: target.value,
      });
    } else {
      setOrder({
        ...order,
        column: target.value,
      });
    }
  };

  const handleOrder = () => {
    const { column } = order;
    const MAGIC = 1;
    const newPlanets = filterPlanets.map((item) => item);
    newPlanets.sort((a, b) => {
      if (b[column] === 'unknown') {
        return a[column] === 'unknown' ? 0 : -MAGIC;
      } if (a[column] === 'unknown') {
        return 1;
      }
      return order.sort === 'ASC' ? a[column] - b[column] : b[column] - a[column];
    });

    setFilterPlanets(newPlanets);
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
          <div data-testid="filter" key={ filter.filterColunm }>
            <span>{filter.filterColunm}</span>
            <span>{filter.operator}</span>
            <span>{filter.operatorValue}</span>
            <button onClick={ () => deleteFiltered(filter.filterColunm) }>Delete</button>
          </div>
        ))}
        <button
          data-testid="button-remove-filters"
          onClick={ () => deleteAllFilters() }
        >
          Delete All Filters
        </button>
      </div>
      <div>
        <select onChange={ radios } data-testid="column-sort">
          { filterSelectInitial.map((filter) => (
            <option key={ filter }>{ filter }</option>
          ))}
        </select>
        <div onChange={ radios }>
          <label>
            Ascendente
            <input
              type="radio"
              name="order"
              id="ASC"
              value="ASC"
              data-testid="column-sort-input-asc"
            />
          </label>
          <label>
            Descendente
            <input
              type="radio"
              name="order"
              id="DESC"
              value="DESC"
              data-testid="column-sort-input-desc"
            />
          </label>
        </div>
        <button
          data-testid="column-sort-button"
          onClick={ handleOrder }
          disabled={ !order.sort }
        >
          Ordenar
        </button>
      </div>
      <Table filterPlanets={ filterPlanets } />
    </div>
  );
}

export default StarWars;
