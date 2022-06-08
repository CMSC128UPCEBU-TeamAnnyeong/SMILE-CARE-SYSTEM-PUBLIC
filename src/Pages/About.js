import React from 'react'
import { Carousel } from 'react-bootstrap'
import './About.css'

//Pictures
import about_low from './../Assets/about-low.png'
import about_1 from './../Assets/about_1.png'
import about_2 from './../Assets/about_2.png'
import about_3 from './../Assets/about_3.png'
import about_4 from './../Assets/about_4.png'
import gen_den from './../Assets/gen-den.png'
import prostho from './../Assets/prostho.png'
import endo from './../Assets/endo.png'  
import ortho from './../Assets/ortho.png' 
import tmj from './../Assets/tmj.png'  
import cosmetic from './../Assets/cosmetic.png'  
import surgery from './../Assets/surgery.png'  
import clock from './../Assets/clock.png'

function About() {
  return (  
    <div className='row g-0'>
        <div className='col-6'>
            <div className='about-cont'>
            <div className='row'>
                <div className='about-header'>Surigao Dental Center</div>
                <div className='about-body'> Established in 2021, Surigao Dental Center is a clinic that provides safe, affordable, 
                and effective dental treatments located in Surigao City. It offers a wide array of services to cater to the dental needs of Surigaonons ranging from basic dental 
                procedures to dental specialties such as cosmetic dentistry, root canal treatments, orthodontic braces and Invisalign, 
                oral surgeries, and dental implants. 
                </div>
                <div className='about-body'>The clinic is owned and operated by your friendly neighborhood dentist, Dr. 
                Ezra Delani-Sobrecaray, a licensed dentist.
                </div>
                <img src={about_low} className="about-low" />
            </div>
            </div>
        </div>

        <div className='col-6'>
            <div className='slide'>
                <Carousel>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={about_1}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={about_2}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={about_3}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={about_4}
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>

        <div className='row'>
            <div className='service-header'>Dental Services</div>
                <div className='row'>
                    <div className='col-3'>
                        <img src={gen_den} className='service-icon' />
                        <div className='service-title'>General Dentistry</div>
                        <div className='service-body-gen-den'>☑ Oral Prophylaxis</div>
                        <div className='service-body-gen-den'>☑ Tooth Filling</div>
                        <div className='service-body-gen-den'>☑ Tooth Extractions</div>
                    </div>
                    <div className='col-3'>
                        <img src={prostho} className='service-icon' />
                        <div className='service-title'>Prosthodontics</div>
                        <div className='service-body-prostho'>☑ Removable Dentures</div>
                        <div className='service-body-prostho'>☑ Fixed Partial Dentures</div>
                    </div>
                    <div className='col-3'>
                        <img src={endo} className='service-icon' />
                        <div className='service-title'>Endodontics</div>
                        <div className='service-body-endo'>☑ Post and Core</div>
                        <div className='service-body-endo'>☑ Root Canal Treatment</div>
                    </div>
                    <div className='col-3'>
                        <img src={ortho} className='service-icon' />
                        <div className='service-title'>Orthodontics</div>
                        <div className='service-body-ortho'>☑ Braces</div>
                        <div className='service-body-ortho'>☑ Retainers Space Maintainers</div>
                        <div className='service-body-ortho'>☑ Other Orthodontic Appliance</div>
                        <div className='service-body-ortho'>☑ Kline Aligners</div>
                        <div className='service-body-ortho'>☑ Mouthguard</div>
                    </div>
                </div>

                <div className='row-cont'>
                    <div className='row'>
                        <div className='col-4'>
                            <img src={tmj} className='service-icon-tmj' />
                            <div className='service-title'>TMJ Treatment</div>
                            <div className='service-body-tmj'>☑ Splint</div>
                        </div>
                        <div className='col-2'>
                            <img src={cosmetic} className='service-icon-cosmetic' />
                            <div className='service-title'>Cosmetic Dentistry</div>
                            <div className='service-body-cosmetic'>☑ Teeth Whitening</div>
                            <div className='service-body-cosmetic'>☑ Veneers</div>
                        </div>
                        <div className='col-3'>
                            <img src={surgery} className='service-icon-surgery' />
                            <div className='service-title'>Dental Surgery</div>
                            <div className='service-body-surgery'>☑ Gum Contouring</div>
                            <div className='service-body-surgery'>☑ Removal of Impacted Tooth</div>
                            <div className='service-body-surgery'>☑ Frenectomy</div>
                        </div>
                    </div>
                </div>
            </div>

                    <div className='store-cont'>
                    <div className='row'>
                        <div className='col-3'>
                            <img src={clock} className='clock' />
                        </div>
                        <div className='col-4'>
                            <div className='clinic-hour-header'>Clinic Hours</div>
                            <div className='clinic-hour-subheader'>Monday to Saturday</div> 
                            
                        </div>
                        <div className='col-3'>
                        <div className='clinic-hour-subsubheader'>9:00 AM - 5:00 PM</div> 
                        </div>
                    </div>
            </div>
    </div>
  )
}

export default About