import React, { useContext } from 'react';
import MyContext from '../Context/MyContext';

function Table() {
  const {
    planets,
    searchInput,
    filteredPlanets,
    ordenedState,
    setOrdenedState,
    optionsFilterAgain,
    setPlanets,
  } = useContext(MyContext);

  const handleChangeSort = ({ target: { name, value } }) => {
    setOrdenedState({ order: { ...ordenedState.order, [name]: value } });
  };

  const handleSort = () => {
    const newOrder = planets.slice();
    if (ordenedState.order.sort === 'ASC') {
      newOrder.sort((a, b) => {
        if (a[ordenedState.order.column] === 'unknown') return 1;
        return Number(a[ordenedState.order.column])
        - Number(b[ordenedState.order.column]);
      });
    } else {
      newOrder.sort((a, b) => {
        const menosUM = -1;
        if (a[ordenedState.order.column] === 'unknown') return 1;
        if (b[ordenedState.order.column] === 'unknown') return menosUM;
        return Number(b[ordenedState.order.column])
        - Number(a[ordenedState.order.column]);
      });
    }
    setPlanets(newOrder);
  };

  return (
    <main>
      <div>
        <select
          data-testid="column-sort"
          name="column"
          onChange={ handleChangeSort }
        >
          {optionsFilterAgain.map((options, index) => (
            <option
              key={ index }
            >
              {options}
            </option>))}
        </select>
        <div>
          <input
            type="radio"
            id="asc"
            name="sort"
            value="ASC"
            data-testid="column-sort-input-asc"
            onChange={ handleChangeSort }
          />
          <input
            type="radio"
            id="desc"
            name="sort"
            value="DESC"
            data-testid="column-sort-input-desc"
            onChange={ handleChangeSort }
          />
          <button
            type="button"
            data-testid="column-sort-button"
            onClick={ handleSort }
          >
            Ordenar
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            planets.filter((planet) => {
              let x = true;
              if (filteredPlanets && filteredPlanets.length > 0) {
                x = filteredPlanets.every((a) => {
                  if (planet[a.column] === 'unknown') return false;
                  if (a.comparison === 'maior que') {
                    return Number(planet[a.column]) > Number(a.value);
                  }
                  if (a.comparison === 'menor que') {
                    return Number(planet[a.column]) < Number(a.value);
                  }
                  return Number(planet[a.column]) === Number(a.value);
                });
              }
              return x && planet.name.includes(searchInput);
            })
              .map((
                { name,
                  rotation_period: rotationPeriod,
                  orbital_period: orbitalPeriod,
                  diameter,
                  climate,
                  gravity,
                  terrain,
                  surface_water: surfaceWater,
                  population,
                  films,
                  created,
                  edited,
                  url },
              ) => (
                <tr
                  key={ name }
                >
                  <td data-testid="planet-name">{name}</td>
                  <td>{rotationPeriod}</td>
                  <td>{orbitalPeriod}</td>
                  <td>{diameter}</td>
                  <td>{climate}</td>
                  <td>{gravity}</td>
                  <td>{terrain}</td>
                  <td>{surfaceWater}</td>
                  <td>{population}</td>
                  <td>{films}</td>
                  <td>{created}</td>
                  <td>{edited}</td>
                  <td>{url}</td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </main>
  );
}

export default Table;
