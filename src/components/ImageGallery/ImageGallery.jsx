import axios from 'axios';
import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import uniqid from 'uniqid';
import Loader from '../Loader/Loader';
import Modal from 'components/Modal/Modal';
import { useState } from 'react';
import { useEffect } from 'react';

const ImageGallery = ({ serach }) => {
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [btnclick, setBtnclick] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [renderImage, setRenderImage] = useState(null);
  const [lastSerach, setLastSerach] = useState('');
  /////////////////////////////////////////
  useEffect(() => {
    const a = async () => {
      if (serach === '') {
        setLastSerach(serach);
        setGallery([]);
        setMaxPage(0);
        setPage(1);
        return;
      }
      if (lastSerach !== serach) {
        setLastSerach(serach);
        ///////////////////zmiana
        setIsLoad(true);

        const response = await axios
          .get(
            `https://pixabay.com/api/?q=${serach}&page=1&key=45960838-6aa652e2d176ee6c6d86f24d6&image_type=photo&orientation=horizontal&per_page=12`
          )
          .then(function (response) {
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
          });

        setIsLoad(false);

        setGallery(response.hits);
        setMaxPage(response.total);
        setPage(1);
        return;
      }
      if (btnclick === true) {
        setIsLoad(true);
        setBtnclick(false);
        const response = await axios
          .get(
            `https://pixabay.com/api/?q=${serach}&page=${page}&key=45960838-6aa652e2d176ee6c6d86f24d6&image_type=photo&orientation=horizontal&per_page=12`
          )
          .then(function (response) {
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
        setIsLoad(false);
        const temp = gallery.concat(response.hits);

        setGallery(temp);
      }
    };
    a();
  }, [serach, page]);
  //////////////////////////////////
  const clickButton = () => {
    setBtnclick(true);
    const temp = page + 1;
    setPage(temp);
  };
  const klick = e => {
    setRenderImage(e.target.attributes[3]);
    setIsClick(true);
  };
  const closeModal = e => {
    if (e.target.localName !== 'img') {
      setIsClick(false);
    }
  };

  const closeK = e => {
    if ('Escape' === e.key) {
      setIsClick(false);
    }
  };

  return (
    <>
      <ul className="imageGallery">
        {serach &&
          gallery.map(e => (
            <ImageGalleryItem data={e} key={uniqid()} klick={klick} />
          ))}
      </ul>
      <Loader isLoad={isLoad} />

      {isClick && (
        <Modal renderImage={renderImage} close={closeModal} closeKey={closeK} />
      )}
      {page * 12 < maxPage && <Button click={clickButton} />}
    </>
  );
};

export default ImageGallery;
