// imports ↓
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

import SearchBar from '../SearchBar/SearchBar.jsx';
import Loader from '../Loader/Loader.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import ImageGallery from '../ImageGallery/ImageGallery.jsx';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.jsx';
import { GoAlert } from 'react-icons/go';
// import ImageModal from '../ImageModal/ImageModal.jsx';

function App() {
  const [searchValue, setSearchValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    {
      images &&
        window.scrollBy({
          top: 100,
          behavior: 'smooth',
        });
    }
  }, [images]);

  useEffect(() => {
    if (searchValue === null) return;
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const imagesBySearch = await axios.get(
          `https://api.unsplash.com/search/photos?client_id=teidMVVe7-sWKxTRBIvTmeV8BBwYOnKyaG_QYy0T0iw&per_page=12&query=${searchValue}&page=${page}`
        );

        if (page > 1) {
          setImages(prevImages => [
            ...prevImages,
            ...imagesBySearch.data.results,
          ]);
        } else {
          setImages(imagesBySearch.data.results);
          setTotalPage(imagesBySearch.data.total_pages);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchValue, page]);

  const onSubmit = term => {
    setSearchValue(term);
  };

  const loadNextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <ImageGallery images={images} />
      {totalPage === page ? null : (
        <LoadMoreBtn totalPage={totalPage} loadNextPage={loadNextPage} />
      )}
      {/* <ImageModal /> */}
    </>
  );
}

export default App;
