import React, { useContext } from 'react';
import MyContext from '../Context/MyContext';

function SearchInputComponent() {
  const {
    setSearchInput,
  } = useContext(MyContext);

  const handleInputSearchChange = ({ target }) => {
    setSearchInput(target.value);
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
    </main>
  );
}
export default SearchInputComponent;
