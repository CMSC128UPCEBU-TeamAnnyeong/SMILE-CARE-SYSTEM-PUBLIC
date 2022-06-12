import React, { useState } from "react"
import "./Home.css"
import home from "../Assets/home.jpg"
import logoSmileCareSystem from "../../src/Assets/logo.png"
import { Navigate } from "react-router-dom"

function Home() {
    const [toAbout, setAbout] = useState(false)
    if (toAbout == true) {
        return <Navigate to={"/about"} />
      }

    function PoweredBy() {
        return (
            <div className="footer">
                <div className="poweredby-text-home">POWERED BY</div>
                <img src={logoSmileCareSystem} className="poweredby-logo" />
            </div>
        )
    }
    
  return (
    <div className="container">
        <div className="row">
                <div className="col-sm-5">
                    <div className="row">
                        <h1 className="home-header">We care for your smile</h1>
                        <h2 className="home-subheader">
                            Surigao Dental Center offers a full range of dental services for both children and adults.
                        </h2>
                    </div>

                    <div className="row">
                        <div className="home submit-btn" onClick={() => setAbout(true)}>Learn More</div>
                    </div>
            </div>
            <div className="col-sm-7">
                <img src={home} className="home-pic" />
            </div>
        </div>
        <PoweredBy/>
    </div>
  )
}

export default Home