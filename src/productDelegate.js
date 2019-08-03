import AppService from './app-service';

const ProductDelegate = function() {

    this.changeUser = user_id => {
        return AppService.fetchGetUserInfo(user_id)
        .then(userInfo => {
          this.setState({
            userInfo: userInfo.userInfo
          })
          AppService.fetchYourProducts(user_id)
          .then(yourProducts => {
            this.setState({
              yourItems: yourProducts
            })
          })
          AppService.fetchGetShopProducts(user_id)
          .then(shoppingItems => {
            this.setState({
              shoppingItems
            })
            this.getNewProductToSell();
          })
          AppService.fetchPurchasedProducts(user_id)
          .then(purchasedProducts => {
            this.setState({
              purchasedItems: purchasedProducts
            })
          })
          AppService.fetchGetUsersPopularProducts(user_id)
          .then(usersPopularProducts => {
            this.setState({
              usersPopularProducts: usersPopularProducts
            })
          })
          AppService.fetchGetPopularProducts(user_id)
          .then(popularProducts => {
            this.setState({
              popularProducts: popularProducts
            })
          })
        })
        .catch(error => {
          return error
        })
      }

    this.updateProductState = function (index, adCosts) {
        const updatedProduct = Object.assign({}, this.app.state.currentlyEditing);


        if (adCosts[this.app.state.currentlyEditing.ad] > adCosts[this.app.state.yourItems[index].ad]) {
            this.subtractTotalByPrice(adCosts[this.app.state.currentlyEditing.ad]);
            updatedProduct.profit = parseFloat(updatedProduct.profit) - parseFloat(adCosts[this.app.state.currentlyEditing.ad]);
        }
    
        const updatedItemsArray =  JSON.parse(JSON.stringify(this.app.state.yourItems));
        updatedItemsArray[index] = updatedProduct;

        return this.setState({
            yourItems: updatedItemsArray,
            currentlyEditing: ''
        })
    }

    this.subtractProfit = (index, lessProfit) => {
        const updatedItems = Object.assign({}, this.app.state.yourItems);
        updatedItems[index].profit = updatedItems[index].profit - lessProfit;

        return this.setState({
            yourItems: updatedItems
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

        if (this.app.state.shoppingItems.length !== 0 && newIndex < this.app.state.shoppingItems.length) {
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
        else {
            return this.setState({
                currentShoppingItem: {
                    index: -1,
                }
            })
        }
    } 
     
    this.subtractTotalByPrice = function(price) {
        const newTotal = this.app.state.userInfo.money - price;

        const newUserInfo = Object.assign({}, this.app.state.userInfo)

        newUserInfo.money = newTotal;

        return this.setState({
            userInfo: newUserInfo
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

    this.validateUpdate = function(index, adCosts) {
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
        
        if (parseFloat(adCosts[this.app.state.currentlyEditing.ad]) > parseFloat(adCosts[this.app.state.yourItems[index].ad]) && parseFloat(adCosts[this.app.state.currentlyEditing.ad]) > parseFloat(this.app.state.userInfo.money)) {
            errorMessages.push(`You can't afford ${this.app.state.currentlyEditing.ad}`)
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

    this.addNewProduct = function(newItem, adPrice) {
        console.log('newitem', newItem)

        if (parseFloat(adPrice > 0)) {
            this.subtractTotalByPrice(adPrice);
            newItem.profit = newItem.profit - adPrice;
        }
        const newYourItems = JSON.parse(JSON.stringify(this.app.state.yourItems));

        newYourItems.push(newItem);

        this.setState({
            yourItems: newYourItems
        })
    }

    this.newPurchasedItem = function(newItem, id) {
        const newPurchasedItem = Object.assign({}, newItem);
        const newPurchasedItems = JSON.parse(JSON.stringify(this.app.state.purchasedItems));

        newPurchasedItem.id = id;
        newPurchasedItem.bonus = 0.00;

        newPurchasedItems.push(newPurchasedItem);

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
           changeUser: this.changeUser.bind(this),
           subtractProfit: this.subtractProfit.bind(this)
    }
}
   
     export default new ProductDelegate();