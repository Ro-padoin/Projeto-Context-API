import React from 'react';
import './App.css';
import Table from './component/Table';
import PlanetsProvider from './context/PlanetsContext';

function App() {
  return (
    <PlanetsProvider>
      <Table />
    </PlanetsProvider>
  );
}

export default App;
