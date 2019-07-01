import React, {Component} from 'react';
import Nav from '../Components/Nav/nav';
import './newProduct.css';
import TenderContext from '../context';

class NewProduct extends Component {

    static contextType = TenderContext;

    constructor(props) {
        super(props);
        this.state = {
            item: {
                title: '',
                img: '',
                description: '',
                price: '',
                advertise: 'None'
            }
        }
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.validateNewProduct = this.validateNewProduct.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeInput(e) {
        const newItem = Object.assign({}, this.state.item);
        newItem[e.target.id] = e.target.value;
        this.setState({
            item: newItem
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const validate = this.validateNewProduct(this.state.item);

        if (validate) {
            this.context.setPopupMessages('popup', 'New Product Created!')
            this.resetValues();
            // document.getElementById('productForm').reset();
        }
    }

    resetValues() {
        this.setState({
            item: {
                title: '',
                img: '',
                description: '',
                price: '',
                advertise: 'None'
            }
        })
    }

    validateNewProduct(item) {
        let errorMessages = [];

        if (!item.title) {
            errorMessages.push('Item must have a title');
        }

        if (isNaN(parseFloat(item.price)) || parseFloat(item.price) < 1) {
            errorMessages.push('Item price must be at least 1 Play Money')
        }

        if (errorMessages.length > 0) {
            this.context.setPopupMessages('errorPopup', errorMessages)
            return false;
        }
        else {return true}
    }

    render() {
        return(
            <div>
                <Nav currentComponent={'NewProduct'}/>
                <header>
                    <h2 className="page-header">New Product</h2>
                </header>
                <form id='productForm' className="new-product-form" onSubmit={(e) => this.handleSubmit(e)}>
                    <label htmlFor="title">Title</label>
                    <input 
                        value={this.state.item.title}
                        type="text" 
                        id="title"
                        onChange={(e) => this.handleChangeInput(e)}/>
                    
                    <label htmlFor="img">Image URL (optinal)</label>
                    <input 
                        value={this.state.item.img}
                        type="text" 
                        id="img"
                        onChange={(e) => this.handleChangeInput(e)}/>

                    <label htmlFor="description">Product Description</label>
                    <textarea 
                        value={this.state.item.description}
                        id="description" 
                        placeholder='Machine washable with like colors'
                        onChange={(e) => this.handleChangeInput(e)}>
                    </textarea>

                    <div className="price-ad-wrapper">
                        <div className="price-wrapper">
                            <label className="price" htmlFor="price">Price:</label>
                            <input 
                                value={this.state.item.price}
                                id="price" 
                                type="number" 
                                step="1"
                                onChange={(e) => this.handleChangeInput(e)}/>
                        </div>
                        
                        <label className="current-advertising-label" htmlFor="advertise">Ad Spending</label>
                        <select 
                            id="advertise" 
                            onChange={(e) => this.handleChangeInput(e)}
                            value={this.state.item.advertise}>
                            <option value='None'>None</option>
                            <option value='Homepage ads'>Homepage ads - 50 Play Money per day</option>
                            <option value='Popup ads'>Popup ads - 100 Play Money per day</option>
                            <option value='Annoying Ads'>Annoying Ads - 150 Play Money per day</option>
                        </select>
                    </div>

                    <button className="submit-new-product-btn" type='submit'>Submit</button>

                </form>
            </div>
        )
    }
}

export default NewProduct;