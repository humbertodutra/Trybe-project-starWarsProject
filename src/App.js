import React from 'react';
import './App.css';
import Provider from './Context/MyProvider';
import Table from './Components/Table';
import SearchInputComponent from './Components/SearchInputComponent';
import FilterOptions from './Components/FilterOptions';

function App() {
  return (
    <Provider>
      <SearchInputComponent />
      <FilterOptions />
      <Table />
    </Provider>
  );
}

export default App;
