import React from 'react';

const Biography=({imageUrl})=>{
    return(
    <>
              <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          {/* <p>Biography</p> */}
          <h3>Who We Are?</h3>
          <p>
            <b>Introduction: </b> At ABC Hospital, we are dedicated to providing exceptional healthcare services to our community. Our mission is to deliver compassionate, patient-centered care through advanced medical practices and cutting-edge technology.
          </p>
          <p>
            <b>Our mission:</b>We strive to create a safe, welcoming environment where every patient feels valued and respected. Our team of highly skilled healthcare professionals is committed to offering personalized treatment plans tailored to each individual's needs.
          </p>
          <p>
            <b>Our Expertise and Commitment:</b>At ABC Hospital, we offer specialized departments, advanced medical technology, and collaborative healthcare teams to ensure optimal outcomes. Our commitment extends beyond treatment, providing comprehensive discharge plans, follow-up care, and community involvement to support long-term patient wellness and community health.
          </p>
        </div>
      </div>
    </>
    )
}
export default Biography;