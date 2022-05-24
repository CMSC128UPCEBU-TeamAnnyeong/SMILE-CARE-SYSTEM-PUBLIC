import React, { useState } from 'react';
import './ViewQueue.css';
import { Navigate } from "react-router-dom"

/** img **/
import main from '../Assets/main.png';
import rightArrow from '../Assets/right-arrow.png';

function ViewQueue() {
  const [redirect, setRedirect] = useState(false);

  const handleToken = (e) => {
    localStorage.setItem('token',  JSON.stringify(e.target.value));
  }

  React.useEffect(() => {
    localStorage.removeItem('token');
  },[])


  if(redirect === true) {
      return <Navigate to="/view"/>
  }

  return (
    <div className="container">
      <div className='row'>
          <div className='col-sm-6'>
            <img src={main} className="view-queue-pic"/>
          </div>
          <div className='col-sm-5'>
              <div className='row'>
                  <h1 className='view-header'>View Queue</h1>
                  <h2 className='view-subheader'>For hassle-free appointment</h2>
                  <p className='view-body'><b>Got your token?</b> Input your token for easy viewing of priority.</p>
                  <p className='view-subbody'><b>No token?</b> No problem, view the status of clinic without token</p>
              </div>
              <div className='row'>
                  <input type="text" className='code text-input' placeholder='TOKEN' onChange={(e) => handleToken(e)}/>
              </div>
              <div className='row'>
                <div className='submit-btn-cont' onClick={() => setRedirect(true)}>
                    <div className='view-queue submit-btn'>View Queue</div>
                    <div className='view-queue submit-btn btn-part'>
                        <img src={rightArrow} className="arrow-icon"/>
                    </div>
                </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default ViewQueue