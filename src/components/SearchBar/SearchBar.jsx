import css from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  return (
    // <div className={css.search}>
    //   <h4>Find contacts by name:</h4>
    //   <input
    //     className={css.input}
    //     type="text"
    //     placeholder="Search contacts..."
    //     // necessarily ↓
    //     value={filterValue}
    //     onChange={handleChange}
    //   />
    // </div>

    <header>
      <form>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onSubmit}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
