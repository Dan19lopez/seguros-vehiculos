import React from 'react';
import './StarEngine.css';

function StartStopButton({ onClick }) {

  /* inicio logica*/













/*termina logica*/

  return (

    <div className="consola">
       <div className="button-container">
      <div className="start-stop-button">
        
      <button type="submit" className='botonEngine'onClick={onClick}>
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
    </div>
   
    
  );
}

export default StartStopButton;
