import React from 'react';
import Stars from '../../Components/Stars/stars';

function CurrentProduct(props) {
    return(
        <section className='current-product'>
            <div className='choose-buttons'>
                <button onClick={() => props.handleSkip()}>Skip</button>
                <button onClick={() => props.handleBuy()}>Buy</button>
            </div>
            {/* <button onClick={() => props.handleLike()}>Like</button> */}            <h2>{props.item.title}</h2>
            <img className='product-pic' src={props.item.img} alt={props.item.title}/>
            <Stars rating={props.item.rating}/>
            <p>Price: {props.item.price}</p>
            <p>{props.item.description}</p>
        </section>
    )
}

export default CurrentProduct;