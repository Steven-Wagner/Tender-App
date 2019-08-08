import React, {Component} from 'react';
import TenderContext from '../context';
import CurrentProduct from './CurrentProduct/currentProduct';
import ShopInfoBar from './ShopInfoBar/shopInfoBar';
import TokenService from '../services/Token-services';
import {API_BASE_URL} from '../config';
import AnnoyingAd from '../Components/Annoying-ad/annoying-ad';

import './shop.css';

class Shop extends Component {
    
    static contextType = TenderContext;

    constructor(props) {
        super(props);

        this.handleBuy = this.handleBuy.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleDone = this.handleDone.bind(this);
        this.fetchPostPurchase = this.fetchPostPurchase.bind(this);
    }

    async handleBuy() {
        const canAfford = this.context.canAfford(this.context.currentShoppingItem.price)

        if (canAfford) {
            this.fetchPostPurchase(this.context.currentShoppingItem)
            .then(purchaseId => {
                let productIndex;

                if (this.context.currentShoppingItem.ad) {
                    productIndex = this.getProductIndexById(this.context.currentShoppingItem.id)
                }
                else {
                    productIndex = this.context.currentShoppingItem.index
                }
                this.context.removeItemFromState(productIndex);
                this.context.subtractTotalByPrice(this.context.currentShoppingItem.price);
                this.context.newPurchasedItem(this.context.currentShoppingItem, purchaseId.id);
                this.context.getNewProductToSell(0);
            })
            .catch(error => {
                this.context.setPopupMessages('errorPopup', [error.message])
            })
        }
        else {
            this.context.setPopupMessages('errorPopup', ['You can\'t afford that item'])
        }
    }

    fetchPostPurchase(currentShoppingItem) {
        return new Promise((resolve, reject) => {
            const user_id = TokenService.getUserId();

            try {
                fetch(`${API_BASE_URL}/shopProducts/purchase/${user_id}`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        "authorization": `bearer ${TokenService.getAuthToken()}`
                    },
                    body: JSON.stringify({product_id: currentShoppingItem.id})
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

    getProductIndexById(id) {
        return this.context.shoppingItems.findIndex(product => {
            return product.id === id;
        })
    }

    handleSkip() {
        this.context.getNewProductToSell();
    }

    handleLike() {
        this.context.setCurrentProductToLiked();
    }

    handleDone() {
        this.context.goBack();
    }

    render() {
        return(
            <div className="page-wrapper shop-wrapper">
                <AnnoyingAd
                    pathname={this.props.history.location.pathname}/>
                <ShopInfoBar 
                    totalMoney={this.context.userInfo.money}
                    handleDone={this.handleDone}/>
                
                <CurrentProduct 
                    item={this.context.currentShoppingItem}
                    handleBuy={this.handleBuy}
                    handleSkip={this.handleSkip}
                    handleLike={this.handleLike}/>
            </div>
        )
    }
}

export default Shop;