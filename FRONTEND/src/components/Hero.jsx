import React from 'react';

const Hero=({title,imageUrl})=>{
    return(
    <>
        <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
            At ABC Hospital, the efficient admission process ensures quick
            care. The emergency room handles critical cases with advanced
            diagnostics and treatments. Equipped cardiology and
            well-maintained facilities support patient health.
             Discharge instructions and regular check-ups foster
            ongoing wellness.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero"  />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
    )
}
export default Hero;