import {API_BASE_URL} from '../src/config';
import TokenService from '../src/services/Token-services';

const ProductDelegate = function() {

    this.fetchGetShopProducts = user_id => {
        return new Promise((resolve, reject) => {
            try {
                fetch(`${API_BASE_URL}/shopProducts/${user_id.id}`, {
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
    this.fetchGetUserInfo = user_id => {
        return new Promise((resolve, reject) => {
            try {
                fetch(`${API_BASE_URL}/userInfo/${user_id.id}`, {
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

    this.fetchYourProducts = user_id => {
        return new Promise((resolve, reject) => {
            try {
                fetch(`${API_BASE_URL}/yourProducts/${user_id.id}`, {
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

    this.updateProductState = function (index) {
    
        const updatedItemsArray =  JSON.parse(JSON.stringify(this.app.state.yourItems));
        updatedItemsArray[index] = Object.assign({}, this.app.state.currentlyEditing);

        return this.setState({
            yourItems: updatedItemsArray,
            currentlyEditing: ''
        })
    }
   
    this.setCurrentProductToLiked = function() {
        return this.setState({
            currentShoppingItem:{
                liked: true
            }
        })
    }

    this.removeItemFromState = function(index) {
        const newShoppingItems = this.app.state.shoppingItems.slice();
        newShoppingItems.splice(index, 1)

        return this.setState({
            shoppingItems: newShoppingItems
        })
    }
    
    this.getNewProductToSell = function(indexToIncrease = 1) {
        let newIndex = this.app.state.currentShoppingItem.index + indexToIncrease;
        if(newIndex >= this.app.state.shoppingItems.length) {
            newIndex = 0;
        }
        if (this.app.state.shoppingItems.length !== 0) {
            return this.setState({
                currentShoppingItem: {
                    index: newIndex,
                    title: this.app.state.shoppingItems[newIndex].title,
                    description: this.app.state.shoppingItems[newIndex].description,
                    price: this.app.state.shoppingItems[newIndex].price,
                    img: this.app.state.shoppingItems[newIndex].img,
                    id: this.app.state.shoppingItems[newIndex].id
                }
            })
        }
    } 
     
    this.subtractTotalByPrice = function(price) {
        const newTotal = this.app.state.totalMoney - price;

        return this.setState({
            totalMoney: newTotal
        })
    }
   
    this.handleDelete = function(index) {
        const updatedItemsArray = this.app.state.yourItems.filter((item, i) => {
            return i !== index
        })
        const currentlyEditingObject = this.app.state.currentlyEditing.index === index
            ? {}
            : this.app.state.currentlyEditing

        return this.setState({
            yourItems: updatedItemsArray,
            currentlyEditing: currentlyEditingObject
        })
    }

    this.validateUpdate = function(index) {
        let errorMessages = [];

        if (this.app.state.currentlyEditing.index !== index) {
            errorMessages.push(`You haven't changed this item. Perhaps you meant to update ${this.app.state.currentlyEditing.title}`);
        }

        if (!this.app.state.currentlyEditing) {
            return false;
        }

        if (!this.app.state.currentlyEditing.price || this.app.state.currentlyEditing.price < 1) {
            errorMessages.push('Product must include a valid price of at least 1 Play Money')
        }

        if (errorMessages.length > 0) {
            this.app.setPopupMessages('errorPopup', errorMessages);
            return false;
        }

        else {
            return true;
        }
    }
      
    this.setPopupMessages = function(popupToPop, messages) {
        return this.setState({
            [popupToPop]: {
                messages: messages,
                status: true
            }
        })
    }
   
    this.updateCurrentShoppingItem = function(item) {
        item.index = this.app.state.currentShoppingItem.index;
        item.ad = true;
        return this.setState({
            currentShoppingItem: item
        })
    }

    this.addNewProduct = function(newItem) {
        const newYourItems = JSON.parse(JSON.stringify(this.app.state.yourItems));

        newYourItems.push(newItem);

        return this.setState({
            yourItems: newYourItems
        })
    }

    this.newPurchasedItem = function(newItem) {
        const newPurchasedItems = JSON.parse(JSON.stringify(this.app.state.purchasedItems));

        newPurchasedItems.push(newItem);

        return this.setState({
            purchasedItems: newPurchasedItems
        })
    }

    this.handlePurchasedItemDelete = function(index) {
        const updatedItemsArray = this.app.state.purchasedItems.filter((item, i) => {
            return i !== index;
        })

        return this.setState({
            purchasedItems: updatedItemsArray
        })
    }
   
    this.handleChangeInput = function(e, index) {
        let newInput = Object.assign({}, this.app.state.currentlyEditing);

        if (this.app.state.currentlyEditing.index === index) {
            newInput[e.target.id] = e.target.value;
            return this.setState({
            currentlyEditing: newInput
            })
        }

        else {

            newInput = Object.assign({}, this.app.state.yourItems[index])
            newInput.index = index;
            newInput[e.target.id] = e.target.value;

            return this.setState({
            currentlyEditing: newInput,
            })
        }
    }
   
   
    this.app = null;
    this.function = null;
    this.info = null;
   
    this.register = function(app, fn1, fn2){
        this.app = app;
        this.function = fn1;
        this.info = fn2;
    };
   
       // take any state that an event would modify and pass it to the app
    this.setState = function(newState){
        let name = '';
        if( this.app && this.info instanceof Function ){
            let info = this.app[this.info]();
            name = info.name;
            let showTitle = info.showTitle;
            if( showTitle ){
                console.log('App name:', name);
            }
        }

        if( this.app && this.function instanceof Function ){
            let receiver = this.app;
            let method = this.function;
            let argument = newState;

            // this.app[this.function](newState);
            return receiver.updateProductsState(argument);
        }
    }
   
    this.functions = {
   
           handleChangeInput: this.handleChangeInput.bind(this),
           updateProductState: this.updateProductState.bind(this),
           handleDelete: this.handleDelete.bind(this),
           updateCurrentShoppingItem: this.updateCurrentShoppingItem.bind(this),
           getNewProductToSell: this.getNewProductToSell.bind(this),
           removeItemFromState: this.removeItemFromState.bind(this),
           subtractTotalByPrice: this.subtractTotalByPrice.bind(this),
           setCurrentProductToLiked: this.setCurrentProductToLiked.bind(this),
           validateUpdate: this.validateUpdate.bind(this),
           addNewProduct: this.addNewProduct.bind(this),
           handlePurchasedItemDelete: this.handlePurchasedItemDelete.bind(this),
           newPurchasedItem: this.newPurchasedItem.bind(this),
           fetchGetUserInfo: this.fetchGetUserInfo.bind(this),
           fetchYourProducts: this.fetchYourProducts.bind(this),
           fetchGetShopProducts: this.fetchGetShopProducts.bind(this)
     
    }
}
   
     export default new ProductDelegate();