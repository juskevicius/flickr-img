import React from 'react';
import PropTypes from 'prop-types';

export default function Title({ title }) {
  return (
    <div className="title-container">
      {title && (
        <div className="title-wrapper">
          <div className="title">{title}</div>
        </div>
      )}
    </div>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
};
