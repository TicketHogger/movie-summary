import React from 'react';
import PropTypes from 'prop-types';

const LeftArrow = ({ prevPhoto }) => (
  <div onClick={prevPhoto} onKeyPress={prevPhoto} role="button" tabIndex="0">
    <i className="fa fa-arrow-left fa-2x" aria-hidden="true" />
  </div>
);

LeftArrow.propTypes = {
  prevPhoto: PropTypes.func.isRequired,
};

export default LeftArrow;
