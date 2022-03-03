import React from 'react';
import './style/header.css';
import Table from './component/Table';
import PlanetsProvider from './context/PlanetsContext';

function App() {
  return (
    <>
      <section className="box-header">
        <header>
          <h2>Projeto Star Wars - Context API e Hooks</h2>
        </header>
      </section>

      <PlanetsProvider>
        <Table />
      </PlanetsProvider>

    </>
  );
}

export default App;
