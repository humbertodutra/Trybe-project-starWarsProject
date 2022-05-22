import React, { useContext } from 'react';
import MyContext from '../Context/MyContext';

function Table() {
  const {
    planets,
    searchInput,
    setSearchInput,
    filteredPlanets,
    setFilteredPlanets,
    filterValues,
    setFilterValues,
    filterOptions,
    ordenedState,
    setOrdenedState,
    optionsFilterAgain,
    setOptionsAgain,
    setPlanets,
  } = useContext(MyContext);

  const handleInputSearchChange = ({ target }) => {
    setSearchInput(target.value);
  };

  const handleChangeSort = ({ target: { name, value } }) => {
    setOrdenedState({ order: { ...ordenedState.order, [name]: value } });
  };

  const handleSort = () => {
    const newOrder = planets.slice();
    if (ordenedState.order.sort === 'ASC') {
      newOrder.sort((a, b) => {
        if (a[ordenedState.order.column] === 'unknown') return 1;
        return Number(a[ordenedState.order.column]) - Number(b[ordenedState.order.column]);
      });
    } else {
      newOrder.sort((a, b) => {
        if (a[ordenedState.order.column] === 'unknown') return 1;
        if (b[ordenedState.order.column] === 'unknown') return -1;
        return Number(b[ordenedState.order.column]) - Number(a[ordenedState.order.column]);
      });
    }
    setPlanets(newOrder);
  };

  const handleFilter = ({ target }) => {
    switch (target.id) {
    case 'selectNumberPopulation':
      setFilterValues({
        filterByNumericValues: [
          {
            column: filterValues.filterByNumericValues[0].column,
            comparison: filterValues.filterByNumericValues[0].comparison,
            value: target.value,
          },
        ],
      });
      break;

    case 'selectColum':
      setFilterValues({
        filterByNumericValues: [
          {
            column: target.value,
            comparison: filterValues.filterByNumericValues[0].comparison,
            value: filterValues.filterByNumericValues[0].value,
          },
        ],
      });

      break;
    case 'comparision-filter':
      setFilterValues({
        filterByNumericValues: [
          {
            column: filterValues.filterByNumericValues[0].column,
            comparison: target.value,
            value: filterValues.filterByNumericValues[0].value,
          },
        ],
      });
      break;

    default: console.log('nenhum filtro selecionado');
    }
  };

  const clickToFilter = () => {
    const colum = filterValues.filterByNumericValues[0].column;
    const valuee = filterValues.filterByNumericValues[0].value;
    const comapare = filterValues.filterByNumericValues[0].comparison;

    setFilteredPlanets((prevState) => [...prevState, { column: colum,
      comparison: comapare,
      value: valuee }]);
  };

  return (
    <main>
      <label htmlFor="searchInput">
        Search Planet By name:
        <input
          name="searchInput"
          id="searchInput"
          type="text"
          data-testid="name-filter"
          onChange={ (event) => handleInputSearchChange(event) }
        />
      </label>
      <div>
        <label htmlFor="colum-filter">
          Selecione a coluna:
          <select
            name="colum-filter"
            data-testid="column-filter"
            id="selectColum"
            onChange={ handleFilter }
          >
            {
              (filterOptions.filter((a) => !filteredPlanets.some((b) => b.column === a))
                .map((a, index) => (
                  <option key={ index } value={ a }>
                    {a}
                  </option>
                )))
            }
          </select>
        </label>

        <label htmlFor="comparision-filter">
          Filtro Comparativo:
          <select
            name="comparision-filter"
            data-testid="comparison-filter"
            id="comparision-filter"
            onChange={ handleFilter }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>

        <label htmlFor="selectNumberPopulation">
          Population
          <input
            id="selectNumberPopulation"
            type="number"
            data-testid="value-filter"
            value={ filterValues.filterByNumericValues[0].value }
            onChange={ handleFilter }
          />

          <button
            id="buttonFilter"
            type="button"
            data-testid="button-filter"
            onClick={ clickToFilter }
          >
            Filter
          </button>
        </label>
      </div>
      <button
        id="button-Remover-Filter"
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => setFilteredPlanets([]) }
      >
        Remover Filtros
      </button>

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
      <div>
        {

          (filteredPlanets.length > 0)
            ? (
              filteredPlanets.map((a, index) => (
                <div key={ index } data-testid="filter">
                  <p key={ index }>{`${a.column} ${a.comparison} ${a.value}`}</p>
                  <button
                    type="button"
                    id={ a.column }
                    onClick={ ({ target }) => {
                      const abc = filteredPlanets.filter((b) => b.column !== target.id);
                      setFilteredPlanets(abc);
                    } }
                  >
                    X
                  </button>

                </div>
              )))

            : (<p>Utilize os filtros para fazer sua pesquisa</p>)
        }
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

