import React, { useContext } from 'react';
import './App.css';
import Table from './components/Table';
import { PlanetsContext } from './context/PlanetsProvider';

function App() {
  const { loading, planetData } = useContext(PlanetsContext);
  return (
    <>
      <span>Hello, App!</span>
      { loading && <p>Carregando dados...</p>}
      { !loading && <Table />}
    </>
  );
}

export default App;
