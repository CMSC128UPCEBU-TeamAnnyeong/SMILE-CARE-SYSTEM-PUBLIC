import React from 'react'
import Address from "../Assets/placeholder.png"
import PhoneCall from "../Assets/phone-call.png"
import Email from "../Assets/email.png"
import Facebook from "../Assets/facebook.png"
import './Contact.css'
import logoSmileCareSystem from "../../src/Assets/logo.png"

function PoweredBy() {
    return (
      <div className="footer">
        <div className="poweredby-text-contact">POWERED BY</div>
        <img src={logoSmileCareSystem} className="poweredby-logo" />
      </div>
    )
  }

function Contact() {
  return (
    <div className= 'container-contact'>
        <div className='row'>
            <div className='col-6'>
                <div className='contact-info'>  
                    <div className='row'>
                        <div className='col-sm-1'>
                            <img className='icon-address' src={Address}/>
                        </div>
                        <div className='col-9'>
                            <div className='label'>Lamar Arcade Building, Espina corner Borromeo St., Surigao City, 8400, Surigao del Norte, Philippines</div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-1'>
                            <img className='icon-phone' src={PhoneCall}/>
                        </div>
                        <div className='col-9'>
                            <div className='label-phone'>+63 (966) 703 5943</div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-1'>
                            <img className='icon-email' src={Email}/>
                        </div>
                        <div className='col-9'>
                            <div className='label-email'>
                                <a href="mailto:ekdsobrecaray@yahoo.com" target='_blank'>ekdsobrecaray@yahoo.com</a>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-1'>
                            <img className='icon-fb' src={Facebook}/>
                        </div>
                        <div className='col-9'>
                            <div className='label-fb'>
                                <a href='https://www.facebook.com/surigaodentalcenter/' target='_blank' className='fb-link'>Surigao Dental Center</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='col-6'>
                <div>
                <div className='map'>FIND US</div>
                    <div className='map-cont'>
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.7654005541544!2d125.49658491471008!3d9.785907492998126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3301372bcaaf6017%3A0x2d6aecd6a06e8636!2sSurigao%20Dental%20Center!5e0!3m2!1sen!2sph!4v1653355246115!5m2!1sen!2sph" 
                            width="600" 
                            height="350" 
                            style={{ border: "0"}} 
                            allowfullscreen="" 
                            loading="lazy" 
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
        <PoweredBy/>
    </div>
  )
}

export default Contact