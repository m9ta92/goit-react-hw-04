import axios from 'axios';
import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');

import SearchBar from '../SearchBar/SearchBar.jsx';
import Loader from '../Loader/Loader.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import ImageGallery from '../ImageGallery/ImageGallery.jsx';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.jsx';
import ImageModal from '../ImageModal/ImageModal.jsx';

function App() {
  const [searchValue, setSearchValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (images === null) {
      return;
    }
    if (images.length > 24) {
      window.scrollBy({
        top: 550,
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
          `https://api.unsplash.com/search/photos?client_id=teidMVVe7-sWKxTRBIvTmeV8BBwYOnKyaG_QYy0T0iw&per_page=24&query=${searchValue}&page=${page}`
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

  const modalImage = image => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <ImageGallery images={images} modalImage={modalImage} />
      {totalPage === page ? null : (
        <LoadMoreBtn totalPage={totalPage} loadNextPage={loadNextPage} />
      )}
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        image={selectedImage}
      />
    </>
  );
}

export default App;
