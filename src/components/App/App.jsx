// imports ↓
import { useState, useEffect } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';

import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import ImageGallery from '../ImageGallery/ImageGallery.jsx';
import ImageModal from '../ImageModal/ImageModal.jsx';
import Loader from '../Loader/Loader.jsx';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';

function App() {
  const accessKey = 'teidMVVe7-sWKxTRBIvTmeV8BBwYOnKyaG_QYy0T0iw';
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState(null);

  const onSubmit = term => {
    setSearchValue(term);
  };

  useEffect(() => {
    if (searchValue === null) return;
    const fetchProductsBySearchValue = async () => {
      try {
        setIsLoading(true);
        const imagesBySearch = await axios.get(
          `https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${searchValue}`
        );
        setImages(imagesBySearch.data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductsBySearchValue();
  }, [searchValue]);

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <ImageGallery images={images} />
      {/* <LoadMoreBtn /> */}
      {/* <ImageModal /> */}
    </>
  );
}

export default App;
