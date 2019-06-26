import React, {Component} from 'react';
import Nav from '../Components/Nav/nav';
import mockData from '../mockData';
import PurchasedItem from './PurchasedItem/purchasedItem';

class PurchasedItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchasedItems: mockData.purchasedItems
        }

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(index) {
        const updatedItemsArray = this.state.purchasedItems.filter((item, i) => {
            return i !== index;
        })

        this.setState({
            purchasedItems: updatedItemsArray
        })

        return updatedItemsArray;
    }

    render() {

        const items = this.state.purchasedItems.map((item, i) => {
            return(<PurchasedItem 
                item={item} 
                key={item.title}
                index={i}
                handleDelete={this.handleDelete}/>)
        })

        return(
            <div>
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