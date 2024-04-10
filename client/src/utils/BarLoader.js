import React from 'react'
import { TailSpin } from 'react-loader-spinner';
import '../css/component_css/barloader.css'
const BarLoaders = () => {
  return (
    <div className='bar-loader-container'>
        
            <TailSpin color="#fff" width={300} />
    </div>
  )
}

export default BarLoaders
