import css from './SearchBar.module.css';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const SearchBar = ({ onSubmit }) => {
  const [term, setTerm] = useState(null);

  const handleSubmit = event => {
    event.preventDefault();
    if (term === null) {
      toast.error('Please enter a value to search for !');
      return;
    } else {
      toast.success('Successfully!');
      onSubmit(term.trim());
    }
  };
  return (
    <header>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.searchInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos ..."
          onChange={event => setTerm(event.target.value)}
        />
        <Toaster position="top-right" reverseOrder={false} />
        <button className={css.searchBtn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
