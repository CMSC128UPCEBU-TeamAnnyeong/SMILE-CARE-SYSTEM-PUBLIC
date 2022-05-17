import React from 'react';
import './ViewQueue.css';

/** img **/
import main from '../Assets/main.png';
import rightArrow from '../Assets/right-arrow.png';

function ViewQueue() {
  return (
    <div className="container">
      <div className='row'>
          <div className='col-sm-6'>
            <img src={main} className="view-queue-pic"/>
          </div>
          <div className='col-sm-5'>
              <div className='row'>
                  <h1 className='view-header'>View Queue</h1>
                  <h2 className='view-subheader'>For hassle free appointment</h2>
              </div>
              <div className='row'>
                  <input type="text" className='username text-input' placeholder='USERNAME'/>
                  <input type="text" className='code text-input' placeholder='CODE'/>
              </div>
              <div className='row'>
                <div className='submit-btn-cont'>
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