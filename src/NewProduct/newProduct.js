import React, {Component} from 'react';
import Nav from '../Components/Nav/nav';
import './newProduct.css';
import TenderContext from '../context';
import TokenService from '../services/Token-services';
import {API_BASE_URL} from '../config';

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
                ad: 'None',
                creator_id: TokenService.getUserId(),
                sold: 0,
                profit: '0.00'
            },
            adCosts: {
                'Homepage ads': 0,
                'Popup ads': 0,
                'Annoying ads': 0
            }
        }
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.validateNewProduct = this.validateNewProduct.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getAdCosts()
    }

    getAdCosts() {
        this.fetchGetSimpleAdCosts()
        .then(adCosts => {
            this.setState({
                adCosts: adCosts
            })
        })
    }

    fetchGetSimpleAdCosts() {
        return new Promise((resolve, reject) => {
            try {
                fetch(`${API_BASE_URL}/adCosts/`, {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "authorization": `bearer ${TokenService.getAuthToken()}`
                    }
                })
                .then(res => {
                    return (!res.ok)
                        ? res.json().then(e => {reject (e)})
                        : resolve(res.json())
                })
            }
            catch(error) {
                reject(error);
            }
        })
    }

    handleChangeInput(e) {
        const newItem = Object.assign({}, this.state.item);
        newItem[e.target.id] = e.target.value;
        this.setState({
            item: newItem
        });
    }

    async handleSubmit(e) {
        e.preventDefault();

        const newProduct = this.state.item;
        
        const validate = this.validateNewProduct(newProduct);

        if (validate) {
            this.fetchPostNewProduct(newProduct, {id: TokenService.getUserId()})
            .then(newProductId => {
                newProduct.id = newProductId.id;
                this.context.addNewProduct(newProduct, this.state.adCosts[this.state.item.ad])
                this.context.setPopupMessages('popup', 'New Product Created!')
                this.resetValues();
                window.scrollTo(0, 0);

            })
            .catch(error => {
                this.context.setPopupMessages('errorPopup', [error.message])
            })
        }
    }

    fetchPostNewProduct(newProduct, user_id) {
        return new Promise((resolve, reject) => {
            try {
                fetch(`${API_BASE_URL}/yourproducts/${user_id.id}`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        "authorization": `bearer ${TokenService.getAuthToken()}`
                    },
                    body: JSON.stringify(newProduct)
                })
                .then(res => {
                    return (!res.ok)
                        ? res.json().then(e => {reject (e)})
                        : resolve(res.json())
                })
            }
            catch(error) {
                reject(error);
            }
        })
    }

    resetValues() {
        this.setState({
            item: {
                title: '',
                img: '',
                description: '',
                price: '',
                ad: 'None'
            }
        })
    }

    validateNewProduct(item) {
        let errorMessages = [];

        if (!item.title) {
            errorMessages.push('Item must have a title');
        }

        //user can afford ad
        if (parseFloat(this.state.adCosts[this.state.item.ad]) > parseFloat(this.context.userInfo.money)) {
            errorMessages.push(`You can't afford a ${this.state.item.ad}`)
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
            <div className="nav-space">
                <Nav currentComponent={'NewProduct'}/>
                <div className="page-wrapper">
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
                            type="url" 
                            id="img"
                            onChange={(e) => this.handleChangeInput(e)}/>

                        <label htmlFor="description">Product Description</label>
                        <textarea 
                            className="new-description"
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
                                id="ad"
                                className="select-ad"
                                onChange={(e) => this.handleChangeInput(e)}
                                value={this.state.item.advertise}>
                                <option value='None'>None</option>
                                <option value='Homepage ads'>Homepage ads - {this.state.adCosts['Homepage ads']} Play Money per day</option>
                                <option value='Popup ads'>Popup ads - {this.state.adCosts['Popup ads']} Play Money per day</option>
                                <option value='Annoying ads'>Annoying Ads - {this.state.adCosts['Annoying ads']} Play Money per day</option>
                            </select>
                        </div>

                        <button className="submit-new-product-btn" type='submit'>Submit</button>

                    </form>
                </div>
            </div>
        )
    }
}

export default NewProduct;