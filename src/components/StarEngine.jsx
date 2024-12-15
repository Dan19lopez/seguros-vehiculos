import React from 'react';
import './StarEngine.css';

function StartStopButton() {

  /* inicio logica*/













/*termina logica*/

  return (

    
    <div className="button-container">
      <div className="start-stop-button">
        
      <button type="submit" className='botonEngine'>
        <div className="inner-circle">
          <p className="text">
            <span>START</span>
            <span>STOP</span>
          </p>
          <p className="engine-text">ENGINE</p>
        </div>
        </button>
      </div>
    </div>
    
  );
}

export default StartStopButton;
