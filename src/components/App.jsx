import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageSearch/ImageGallery/ImageGallery';
import { Searchbar } from './ImageSearch/Searchbar';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { fetchImages } from './api';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentImageDescription, setCurrentImageDescription] = useState(null);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = search => {
    setSearch(search);
    setPage(1);
    setImages([]);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = e => {
    if (e.target.nodeName === 'IMG') {
      const currentImageUrl = e.target.dataset.large;
      const currentImageDescription = e.target.alt;
      setCurrentImageUrl(currentImageUrl);
      setCurrentImageDescription(currentImageDescription);

      toggleModal();
    }
  };

  const nextPage = () => {
    window.scrollTo(0, 0);
    setPage(page + 1);
  };

  useEffect(() => {
    setIsLoading(true);
    if (!search) return;
    fetchImages(search, page)
      .then(images => {
        if (images.totalHits === 0) {
          setTotalHits(0);
          return Promise.reject(
            toast.error(`There is no image with name ${search}`)
          );
        }
        setImages(images.hits);
        setTotalHits(images.totalHits);
      })
      .catch(error => setError(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [search, page]);

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {!!images.length && (
        <>
          {showModal && (
            <Modal
              onClose={toggleModal}
              url={currentImageUrl}
              alt={currentImageDescription}
            />
          )}
          <ImageGallery hits={images} openModal={openModal} />
          {totalHits - page * 12 > 0 && <Button onClick={nextPage}></Button>}
        </>
      )}

      <ToastContainer />
    </>
  );
};
