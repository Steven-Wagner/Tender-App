import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import mockData from '../mockData';
import CurrentProduct from './CurrentProduct/currentProduct';
import ShopInfoBar from './ShopInfoBar/shopInfoBar';
import ErrorMessages from '../Components/Error/errorMessages';
import './shop.css';

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shoppingItems: mockData.shoppingItems,
            currentItem: {
                index: -1,
                title: '',
                description: '',
                price: '',
                img: '',
                liked: false,
            },
            totalMoney: mockData.user[0].money,
            errorMessages: ''
        }

        this.getNewProductToSell = this.getNewProductToSell.bind(this);
        this.setErrorMessages = this.setErrorMessages.bind(this);
        this.handleBuy = this.handleBuy.bind(this);
        this.canAfford = this.canAfford.bind(this);
        this.removeItemFromState = this.removeItemFromState.bind(this);
        this.subtractTotalByPrice = this.subtractTotalByPrice.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.setCurrentProductToLiked = this.setCurrentProductToLiked.bind(this);
        this.handleDone = this.handleDone.bind(this);
    }

    componentDidMount() {
        this.getNewProductToSell();
    }

    getNewProductToSell() {
        let newIndex = this.state.currentItem.index + 1;
        if(newIndex >= this.state.shoppingItems.length) {
            newIndex = 0;
        }
        this.setState({
            currentItem: {
                index: newIndex,
                title: this.state.shoppingItems[newIndex].title,
                description: this.state.shoppingItems[newIndex].description,
                price: this.state.shoppingItems[newIndex].price,
                img: this.state.shoppingItems[newIndex].img
            }
        })
    }

    setErrorMessages(errorMessages) {
        this.setState({
            errorMessages: errorMessages
        })
    }

    handleBuy() {
        const canAfford = this.canAfford(this.state.currentItem.price)

        if (canAfford) {
            this.getNewProductToSell();
            this.removeItemFromState(this.state.currentItem.index);
            this.subtractTotalByPrice(this.state.currentItem.price)
        }
        else {
            this.setErrorMessages(['You can\'t afford that item'])
        }
    }

    canAfford(price) {
        if (this.state.totalMoney < price) {
            return false;
        }
        else {
            return true;
        }
    }

    removeItemFromState(index) {
        const newShoppingItems = this.state.shoppingItems.slice();
        newShoppingItems.splice(index, 1)

        this.setState({
            shoppingItems: newShoppingItems
        })
        return;
    }

    subtractTotalByPrice(price) {
        const newTotal = this.state.totalMoney - price;

        this.setState({
            totalMoney: newTotal
        })
    }

    handleSkip() {
        this.getNewProductToSell();
        this.setErrorMessages([])
    }

    handleLike() {
        this.setCurrentProductToLiked();
    }

    setCurrentProductToLiked() {
        this.setState({
            currentItem:{
                liked: true
            }
        })
    }

    handleDone() {
        this.props.history.goBack();
    }

    render() {
        return(
            <div>
                <ShopInfoBar 
                    totalMoney={this.state.totalMoney}
                    handleDone={this.handleDone}/>

                <ErrorMessages errorMessages={this.state.errorMessages}/>
                
                <CurrentProduct 
                    item={this.state.currentItem}
                    handleBuy={this.handleBuy}
                    handleSkip={this.handleSkip}
                    handleLike={this.handleLike}/>
            </div>
        )
    }
}

export default withRouter(Shop);