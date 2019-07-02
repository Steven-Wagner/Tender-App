import React, {Component} from 'react';
import Nav from '../Components/Nav/nav';
import PurchasedItem from './PurchasedItem/purchasedItem';
import TenderContext from '../context';

class PurchasedItems extends Component {

    static contextType = TenderContext;

    render() {

        const items = this.context.purchasedItems.map((item, i) => {
            return(<PurchasedItem 
                item={item} 
                key={item.title}
                index={i}
                handleDelete={this.context.handlePurchasedItemDelete}/>)
        })

        return(
            <div className="page-wrapper">
                <Nav currentComponent='PurchasedItems'/>
                <header>
                    <h2 className="page-header">Purchased Products</h2>
                </header>
                <div className="list-of-items">
                    {items}
                </div>
            </div>
        )
    }
}

export default PurchasedItems;