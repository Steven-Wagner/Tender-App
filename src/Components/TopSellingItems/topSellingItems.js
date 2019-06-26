import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import mockData from '../../mockData';
import ProductDetails from '../ProductDetails/productDetails';
import './topSellingItems.css';
import TenderContext from '../../context';

class TopSellingItems extends Component {

    static contextType = TenderContext;

    constructor(props) {
        super(props);
        if (this.props.status === 'overall' || this.props.status === undefined) {
            this.state = {
                topItems: mockData.topItems
            }
        }
        else {
            this.state = {
                topItems: mockData.yourTopItems,
                includeProfit: true
            }
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(item) {
        if (this.props.status === 'overall') {
            this.context.updateCurrentShoppingItem(item);
            this.props.history.push('/shop/');
        }
        else {
            this.props.history.push('/yourproducts/');
        }
    }

    render() {

        const topItems = this.state.topItems.map(item => {
            return <ProductDetails 
                item={item} 
                key={item.title} 
                includeProfit={this.state.includeProfit}
                handleClick={this.handleClick}/>
        });

        const headerTitle = this.props.status === 'overall'
            ? 'Top Selling Items'
            : 'Your Top Selling Items';

        return(
            <section className="item-summaries">
                <h2>
                    {headerTitle}
                </h2>
                <div>
                    {topItems}
                </div>
            </section>
        )
    }
}

export default withRouter(TopSellingItems);