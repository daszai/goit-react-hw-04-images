import { Searchbar } from './Searchbar/Searchbar';
import React from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import { useState } from 'react';
//import ImageGallery from './test/test';

export const App = () => {
  const [serach, setSerach] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (e.currentTarget.elements[1].value !== '') {
      setSerach(e.currentTarget.elements[1].value);
    } else setSerach('');
  };

  return (
    <div className="app">
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery serach={serach} />
    </div>
  );
};
