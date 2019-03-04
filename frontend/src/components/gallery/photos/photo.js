import React from 'react';
import PropTypes from 'prop-types';

export default function Photo({ photo: { farm, server, id, secret, title } }) {
  return (
    <div className="photo-container">
      <div className="photo-wrapper">
        <img
          className="photo"
          src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`}
          alt={title}
        />
      </div>
    </div>
  );
}

Photo.propTypes = {
  photo: PropTypes.shape({
    farm: PropTypes.number.isRequired,
    server: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    secret: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
