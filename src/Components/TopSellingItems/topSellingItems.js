import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import ProductDetails from '../ProductDetails/productDetails';
import './topSellingItems.css';
import TenderContext from '../../context';

class TopSellingItems extends Component {

    static contextType = TenderContext;

    constructor(props) {
        super(props);
        //Profit is only included for the users top sellers, not for the overall sellers
        if (this.props.status === 'user') {
            this.state = {
                includeProfit: true
            }
        }
        else {
            this.state = {
                includeProfit: false
            }
        }

        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(item) {
        //If user clicks on item it redirect the user either to shop to purchase the item or to YourProducts if the user created the product
        if (this.props.status === 'overall') {
            this.context.updateCurrentShoppingItem(item);
            this.props.history.push('/shop/');
        }
        else {
            this.props.history.push('/yourproducts/');
        }
    }

    render() {

        const topItems = this.props.popularProducts.map(item => {
            return <ProductDetails 
                item={item} 
                key={item.title} 
                includeProfit={this.state.includeProfit}
                handleClick={this.handleClick}/>
        });

        //Header changes based on status of component. Options are 'overall' for overall top sellers or 'user' for the user's top sellers
        const headerTitle = this.props.status === 'overall'
            ? 'Top Selling Items'
            : 'Your Top Selling Items';

        return(
            <section className="item-summaries">
                <h1>
                    {headerTitle}
                </h1>
                <div className="top-items">
                    {topItems}
                </div>
            </section>
        )
    }
}

export default withRouter(TopSellingItems);