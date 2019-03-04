import React from 'react';
import PropTypes from 'prop-types';
import Photo from './photos/photo';
import Title from './photos/title';

export default function Photos(props) {
  return (
    <div className="photos">
      {props.photos.map(photo => (
        <div
          className="card-container"
          key={photo.id}
        >
          <div className="card-wrapper">
            <Photo photo={photo} />
            <Title title={photo.title} />
          </div>
        </div>
      ))}
    </div>
  );
}

Photos.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
};
