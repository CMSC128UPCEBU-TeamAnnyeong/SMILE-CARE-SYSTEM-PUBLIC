import React from 'react'
import "./Home.css"
import home from "../Assets/home.jpg"

function Home() {
  return (
    <div className="container">
        <div className="row">
            <div className="col-sm-5">
                <div className="row">
                    <h1 className="home-header">We care your smile</h1>
                    <h2 className="home-subheader">
                        Surigao Dental Center offers full range of dental services for both adults and children.
                    </h2>
                </div>

                <div className="row">
                    <div
                    /*className="submit-btn-cont"
                    onClick={() => setToNewPatientForm(true)}*/
                    >
                    <div className="home submit-btn">Learn More</div>
                </div>
          </div>
            </div>
            <div className="col-sm-7">
                    <img src={home} className="home-pic" />
                </div>
        </div>
    </div>
  )
}

export default Home