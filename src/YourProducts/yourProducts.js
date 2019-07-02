import React, {Component} from 'react';
import Nav from '../Components/Nav/nav';
import YourProduct from './YourProduct/yourProduct';
import './yourProducts.css';
import TenderContext from '../context';

class YourProducts extends Component {

    static contextType = TenderContext;

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {

        const items = this.context.yourItems.map((item, index) => {
            if (this.context.currentlyEditing.index === index) {
                item = this.context.currentlyEditing;
            }
            return(<YourProduct 
                item={item} 
                key={item.title} 
                index={index}
                handleChangeInput={this.context.handleChangeInput}
                updateProductState={this.context.updateProductState}
                handleDelete={this.context.handleDelete}
                setPopupMessages={this.context.setPopupMessages}
                validateUpdate={this.context.validateUpdate}/>)
        })

        return(
            <div className="page-wrapper">
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