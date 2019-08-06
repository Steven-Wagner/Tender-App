import React from 'react';
// import Stars from '../../Components/Stars/stars';

function PurchasedItem(props) {
    return(
        <section className="current-product">
            <h2>{props.item.title}</h2>
            <img className="product-pic" src={props.item.img} alt={props.item.title}/>
            {/* <Stars rating={props.item.rating}/> */}
            <p className="description">{props.item.description}</p>
            <p>Price: {props.item.price}</p>
            <p>Bonuses: {props.item.bonus}</p>
            <div className="choose-buttons">
                <button
                    onClick={() => props.handleDelete(props.index)}>
                    Delete
                </button>
                {/* <button>Reviews</button> */}
            </div>
        </section>
    )
}

export default PurchasedItem;