import React from 'react';
import './popup.css';

function Popup(props) {
    return(
        <div className="popup">
            {props.messages}
            <button onClick={() => props.removePopup('popup')}>OK</button>
        </div>
    )
}

export default Popup;