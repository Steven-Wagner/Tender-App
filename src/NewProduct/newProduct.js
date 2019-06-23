import React, {Component} from 'react';
import Nav from '../Components/Nav/nav';
import './newProduct.css';

class NewProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            img: '',
            description: '',
            price: '',
            advertise: 'None'
        }
        this.handleChangeInput = this.handleChangeInput.bind(this);
    }

    handleChangeInput(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    render() {
        return(
            <div>
                <Nav currentComponent={'NewProduct'}/>
                <header>
                    <h2 className="page-header">New Product</h2>
                </header>
                <form className="new-product-form">
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        id="title"
                        onChange={(e) => this.handleChangeInput(e)}/>
                    
                    <label htmlFor="product-img">Image URL (optinal)</label>
                    <input 
                        type="text" 
                        id="product-img"
                        onChange={(e) => this.handleChangeInput(e)}/>

                    <label htmlFor="product-description">Product Description</label>
                    <textarea 
                        id="product-description" 
                        placeholder='Machine washable with like colors'
                        onChange={(e) => this.handleChangeInput(e)}>
                    </textarea>

                    <div className="price-ad-wrapper">
                        <div className="price-wrapper">
                            <label className="price" htmlFor="product-price">Price:</label>
                            <input 
                                id="product-price" 
                                type="number" 
                                step="1"
                                onChange={(e) => this.handleChangeInput(e)}/>
                        </div>
                        
                        <label className="current-advertising-label" htmlFor="advertise-product">Ad Spending</label>
                        <select 
                            id="advertise-product" 
                            onChange={(e) => this.handleChangeInput(e)}
                            defaultValue='None'>
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