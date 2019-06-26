import React from 'react';
import './error.css'

function ErrorMesseges(props) {
    let errorMessages = null;;

    if (props.errorMessages.length > 0) {
        errorMessages = props.errorMessages.map((message, index) => {
            return <Error message={message} key={index}/>
        })
    }

    return(
        errorMessages
    )
}

function Error(props) {
    return(
        <p className="error">{props.message}</p>
    )
}

export default ErrorMesseges;