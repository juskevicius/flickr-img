import React from 'react';
import PropTypes from 'prop-types';

export default function SortBtn({ btnFixed, ascending, sortPhotos }) {
  return (
    <div className={`sort-btn-container ${btnFixed ? 'fixed' : ''}`}>
      {ascending
        ? <i onClick={sortPhotos} className="fas fa-sort-alpha-down sort-btn" role="none" />
        : <i onClick={sortPhotos} className="fas fa-sort-alpha-up sort-btn" role="none" />
      }
    </div>
  );
}

SortBtn.propTypes = {
  btnFixed: PropTypes.bool.isRequired,
  ascending: PropTypes.bool.isRequired,
  sortPhotos: PropTypes.func.isRequired,
};
