import React from 'react';
import PropTypes from 'prop-types';

const RightArrow = ({ nextPhoto }) => (
  <div onClick={nextPhoto} onKeyPress={nextPhoto} role="button" tabIndex="0">
    <i className="fa fa-arrow-right fa-2x" aria-hidden="true" />
  </div>
);

RightArrow.propTypes = {
  nextPhoto: PropTypes.func.isRequired,
};

export default RightArrow;
