import React, {Component} from 'react';
import mockData from '../../mockData';
import ProductDetails from '../ProductDetails/productDetails';
import './topSellingItems.css';

class TopSellingItems extends Component {
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
    }

    render() {

        const topItems = this.state.topItems.map(item => {
            return <ProductDetails item={item} key={item.title} includeProfit={this.state.includeProfit}/>
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

export default TopSellingItems;