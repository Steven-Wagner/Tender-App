import React, {Component} from 'react';
import Nav from '../Components/Nav/nav';
import YourProduct from './YourProduct/yourProduct';
import './yourProducts.css';
import TenderContext from '../context';
import TokenService from '../services/Token-services';
import {API_BASE_URL} from '../config';

class YourProducts extends Component {

    static contextType = TenderContext;

    constructor(props) {
        super(props)
        this.state = {
            adCosts: {
                'Homepage ads': 0,
                'Popup ads': 0,
                'Annoying ads': 0,
                'None': 0
            }
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getAdCosts();
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

    getAdCosts() {
        this.fetchGetSimpleAdCosts()
        .then(adCosts => {
            this.setState({
                adCosts: adCosts
            })
        })
    }

    render() {

        const items = this.context.yourItems.map((item, index) => {
            if (this.context.currentlyEditing.index === index) {
                item = this.context.currentlyEditing;
            }
            return(<YourProduct 
                item={item} 
                adCosts={this.state.adCosts}
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