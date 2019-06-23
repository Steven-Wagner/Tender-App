import React, {Component} from 'react';
import Nav from '../Components/Nav/nav';
import mockData from '../mockData';
import YourProduct from './YourProduct/yourProduct';
import './yourProducts.css';
import TenderContext from '../context';

class YourProducts extends Component {

    static contextType = TenderContext;

    constructor(props) {
        super(props);
        this.state = {
            yourItems: mockData.yourTopItems,
            errorPopUp: {status: false, messages: []}
        }
        //finish makeing popup for error messages

        this.updateProductState = this.updateProductState.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    updateProductState(index, price, advertising) {
        const updatedItemsArray = [...this.state.yourItems]
        updatedItemsArray[index].price = price;
        updatedItemsArray[index].advertising = advertising;

        this.setState({
            yourItems: updatedItemsArray
        })

        return updatedItemsArray;
    }

    handleDelete(index) {
        const updatedItemsArray = this.state.yourItems.filter((item, i) => {
            return i !== index
        })

        this.setState({
            yourItems: updatedItemsArray
        })

        return updatedItemsArray;
    }

    render() {

        console.log('provider', this.context.yourItems)

        const items = this.context.yourItems.map((item, index) => {
            return(<YourProduct 
                item={item} 
                key={item.title} 
                index={index}
                updateProductState={this.updateProductState}
                handleDelete={this.handleDelete}/>)
        })

        return(
            <div>
                <Nav currentComponent='YourProducts'/>
                <header>
                    <h2 className="page-header">Your Products</h2>
                </header>
                <div className="list-of-items">
                    {items}
                </div>
            </div>
        )
    }
}

export default YourProducts;