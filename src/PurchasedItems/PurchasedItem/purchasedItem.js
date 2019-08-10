import React from 'react';
// import Stars from '../../Components/Stars/stars';

function PurchasedItem(props) {

    let displayImg = '';

    if (props.item.img) {
        displayImg = <img className="product-pic" src={props.item.img} alt={props.item.title}/>
    }

    return(
        <section className="purchased-product">
            <h2 className="product-title">{props.item.title}</h2>
            {displayImg}
            {/* <Stars rating={props.item.rating}/> */}
            <p className="description">{props.item.description}</p>
            <div className="purchased-info">
                <p>Price: {props.item.price}</p>
                <p>Bonus: {props.item.bonus}</p>
            </div>
            {/* <div className="choose-buttons">
                <button>Reviews</button>
            </div> */}
        </section>
    )
}

export default PurchasedItem;