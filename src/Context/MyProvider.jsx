import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const [planetsToMap, setPlanetsMap] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [ordenedState, setOrdenedState] = useState({
    order: { column: 'population', sort: 'ASC' },
  });
  const [filterValues, setFilterValues] = useState({
    filterByNumericValues: [
      {
        column: 'population',
        comparison: 'maior que',
        value: '0',
      },
    ],
  });
  const optionsToFilter = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const [optionsFilterAgain, setOptionsAgain] = useState(
    optionsToFilter,
  );

  const [filterOptions, setOptions] = useState(
    optionsToFilter,
  );

  useEffect(() => {
    const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const planetsRequest = async () => {
      const response = await fetch(endpoint);
      const { results } = await response.json();
      results.sort((a, b) => a.name.localeCompare(b.name));
      setPlanets(results);
    };
    planetsRequest();
  },
  []);

  const contextValue = {
    planets,
    setPlanets,
    searchInput,
    setSearchInput,
    filteredPlanets,
    setFilteredPlanets,
    filterValues,
    setFilterValues,
    filterOptions,
    setOptions,
    planetsToMap,
    setPlanetsMap,
    ordenedState,
    setOrdenedState,
    optionsFilterAgain,
    setOptionsAgain,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
