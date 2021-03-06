import React from 'react';
import yourProductsService from '../../YourProducts/YourProduct/yourProduct-service';

function ProductDetails (props) {

    return(
        <div className="top-selling-item" onClick={() => props.handleClick(props.item)}>
            <h2 className="product-title">
                {props.item.title}
            </h2>
            <img className="product-img" src={props.item.img} alt={props.item.title}/>
            <div className="popular-info">
                <p>Sold: {props.item.sold}</p>
                <p 
                    className='profit'
                    //Profit is green when positive and red when negative
                    style={yourProductsService.getProfitColor(props.item.profit)}>
                    {props.includeProfit ? `Profit: ${props.item.profit}` : ''}
                </p>
            </div>
        </div>
    )
}


export default ProductDetails;