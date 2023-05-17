import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid';
export default class ImageGallery extends Component {
  render() {
    return (
      <ul className={css.imageGallery}>
        {this.props.data.map(el => {
          return (
            <ImageGalleryItem
              src={el.webformatURL}
              key={nanoid()}
              source={el.largeImageURL}
            />
          );
        })}
      </ul>
    );
  }
}
