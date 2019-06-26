import React from 'react';

function ProductDetails (props) {

    return( 
        <div className="top-selling-item" onClick={() => props.handleClick(props.item)}>
            <h3 className="product-title">
                {props.item.title}
            </h3>
            <img className="product-img" src={props.item.img} alt={props.item.title}/>
            <p>{props.item.description}</p>
            <p>Units Sold: {props.item.sold}</p>
            <p className='profit'>{props.includeProfit ? `Profit: ${props.item.profit}` : ''}</p>
        </div>
    )
}


export default ProductDetails;