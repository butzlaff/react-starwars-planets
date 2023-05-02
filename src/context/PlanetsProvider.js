import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

export const PlanetsContext = createContext();

function PlanetsProvider({ children }) {
  const [planetData, setPlanetData] = useState([]);

  const { error, loading, fetchData } = useFetch();

  const handlePlanets = useCallback(async () => {
    const data = await fetchData('https://swapi.dev/api/planets/');
    setPlanetData(data);
  }, [fetchData]);

  useEffect(() => {
    handlePlanets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const values = useMemo(() => ({
    loading,
    error,
    planetData,
    handlePlanets,
  }), [loading, error, planetData, handlePlanets]);

  return (
    <PlanetsContext.Provider value={ values }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
