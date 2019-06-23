import React from 'react';

export default function StarRating(props) {
    let ratingRounded = Math.round(props.rating)
    const stars = []
    while(stars.length < 5) {
        if (ratingRounded > 0) {
            stars.push(String.fromCharCode(9733))
        }
        else {
            stars.push(String.fromCharCode(9734))
        }
        ratingRounded -= 1
    }
    return (<span className="stars">{stars.join('')}</span>)
}