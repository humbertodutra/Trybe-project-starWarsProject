import React, { useContext } from 'react';
import MyContext from '../Context/MyContext';

function FilterOptions() {
  const {
    filteredPlanets,
    setFilteredPlanets,
    filterValues,
    setFilterValues,
    filterOptions,
  } = useContext(MyContext);

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
    </main>
  );
}

export default FilterOptions;
