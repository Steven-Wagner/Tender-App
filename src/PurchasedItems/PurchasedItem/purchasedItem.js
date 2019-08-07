import React from 'react';
// import Stars from '../../Components/Stars/stars';

function PurchasedItem(props) {

    let displayImg = '';

    if (props.item.img) {
        displayImg = <img className="product-pic" src={props.item.img} alt={props.item.title}/>
    }

    return(
        <section className="current-product">
            <h2>{props.item.title}</h2>
            {displayImg}
            {/* <Stars rating={props.item.rating}/> */}
            <p className="description">{props.item.description}</p>
            <p>Price: {props.item.price}</p>
            <p>Bonuses: {props.item.bonus}</p>
            <div className="choose-buttons">
                {/* <button>Reviews</button> */}
            </div>
        </section>
    )
}

export default PurchasedItem;