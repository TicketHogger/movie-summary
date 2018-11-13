import React from 'react';
import PropTypes from 'prop-types';

const Synopsis = ({ title, synopsis }) => (
  <div className="synopsis-box">
    <h3 className="synopsis-header">
      {title}
      {' Synopsis'}
    </h3>
    <div className="synopsis">{synopsis}</div>
  </div>
);

Synopsis.propTypes = {
  title: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
};

export default Synopsis;
