import React from 'react';
const ImageGalleryItem = ({ data, klick }) => {
  return (
    <li className="imageGalleryItem">
      <img
        className="imageGalleryItem-image"
        src={data.webformatURL}
        alt={data.tags}
        onClick={klick}
        data-large={data.largeImageURL}
      />
    </li>
  );
};

export default ImageGalleryItem;
