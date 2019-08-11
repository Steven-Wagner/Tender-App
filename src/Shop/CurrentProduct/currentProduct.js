import React from 'react';
// import Stars from '../../Components/Stars/stars';

function CurrentProduct(props) {
    if (props.item.index === -1 && !props.item.ad) {
        return(
            <section className='current-product'>
                <p>
                    There are no more products to view
                </p>
            </section>
        )
    }
    const img = props.item.img ? <img className='product-pic' src={props.item.img} alt={props.item.title}/> : '';
    return(
        <section className='current-product'>
            <div className='choose-buttons'>
                <button onClick={() => props.handleSkip()}>Skip</button>
                <button onClick={() => props.handleBuy()}>Buy</button>
            </div>
            {/* <button onClick={() => props.handleLike()}>Like</button> */}            
            <h2>{props.item.title}</h2>
            {img}
            {/* <Stars rating={props.item.rating}/> */}
            <p className="price">Price: {props.item.price}</p>
            <p className="description">{props.item.description}</p>
        </section>
    )
}

export default CurrentProduct;