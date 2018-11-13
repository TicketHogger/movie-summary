import React from 'react';
import '../styles/Photo.css';
import PropTypes from 'prop-types';

const Photo = ({ photo }) => (
  <div>
    <img className="photo" alt="" src={photo} />
  </div>
);

Photo.propTypes = {
  photo: PropTypes.string.isRequired,
};

export default Photo;
