import React from 'react';
import ErrorMessages from '../Error/errorMessages';
import './errorPopup.css';

function ErrorPopup(props) {
    return(
        <div className="error-popup">
            <ErrorMessages errorMessages={props.errorMessages}/>
            <button onClick={() => props.removePopup('errorPopup')}>OK</button>
        </div>
    )
}

export default ErrorPopup;