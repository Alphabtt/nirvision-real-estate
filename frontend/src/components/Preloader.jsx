import React from 'react';

const Preloader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div id="preloader" className="preloader-fade-out">
      <div className="preloader-inner">
        <div className="preloader-logo">NV</div>
        <div className="preloader-bar">
          <div className="preloader-bar-fill"></div>
        </div>
        <p className="preloader-text">NirVision</p>
      </div>
    </div>
  );
};

export default Preloader;
