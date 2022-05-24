import React from 'react'
import './PoweredBy.css'
import logoSmileCareSystem from '../../Assets/logo.png';

function PoweredBy() {
  return (
    <div className='footer'>
        <div className='poweredby-text'>POWERED BY</div>
        <img src={logoSmileCareSystem} className="poweredby-logo"/>
    </div>
  )
}

export default PoweredBy