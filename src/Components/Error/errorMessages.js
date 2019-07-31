import React from 'react';
import './error.css'

function ErrorMesseges(props) {
    let errorMessages = null;
    console.log(props)

    if (props.errorMessages.length > 0) {
        errorMessages = props.errorMessages.map((message, index) => {
            console.log('message', message)
            return <Error message={message} key={index}/>
        })
    }

    return(
        errorMessages
    )
}

function Error(props) {
    console.log('props in error', props.message)
    return(
        <p className="error">{props.message}</p>
    )
}

export default ErrorMesseges;