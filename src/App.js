import React, { useContext } from 'react';
import './App.css';
import StarWars from './components/StarWars';
import { PlanetsContext } from './context/PlanetsProvider';

function App() {
  const { loading } = useContext(PlanetsContext);
  return (
    <>
      <span>Hello, App!</span>
      { loading && <p>Carregando dados...</p>}
      { !loading && <StarWars />}
    </>
  );
}

export default App;
