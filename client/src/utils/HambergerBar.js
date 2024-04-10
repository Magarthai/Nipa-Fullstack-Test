import React from 'react';
import '../css/component_css/hamberger.css';

const HambergerBar = ({ clicked, toggleClicked }) => { 
  return (
    <div className='hamberger-container'>
      <div className='hamberger' onClick={toggleClicked}>
        {clicked ? (
          <>
            <div className='menu line1-clicked'></div>
            <div className='menu line2-clicked'></div>
            <div className='menu line3-clicked'></div>
          </>
        ) : (
          <>
            <div className='menu line1'></div>
            <div className='menu line2'></div>
            <div className='menu line3'></div>
          </>
        )}
      </div>
    </div>
  );
};

export default HambergerBar;
