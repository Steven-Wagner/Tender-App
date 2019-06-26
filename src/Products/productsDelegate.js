

const ProductDelegate = function() {

 this.updateProductState = function (index) {
    const updatedItemsArray =  JSON.parse(JSON.stringify(this.app.state.yourItems));
    updatedItemsArray[index] = Object.assign({}, this.app.state.currentlyEditing);

    if (this.validateUpdate()) {
      this.setState({
          yourItems: updatedItemsArray,
          currentlyEditing: ''
      })
    }

    return updatedItemsArray
  }

  this.setCurrentProductToLiked = function() {
    this.setState({
        currentShoppingItem:{
            liked: true
        }
    })
  }


  this.removePopup = function() {
    this.setState({
      errorPopup: false,
      errorMessages: ''
    })
  }


  this.removeItemFromState = function(index) {
    const newShoppingItems = this.state.shoppingItems.slice();
    newShoppingItems.splice(index, 1)

    this.setState({
        shoppingItems: newShoppingItems
    })
    return;
  }
  this.getNewProductToSell = function() {
    let newIndex = this.state.currentShoppingItem.index + 1;
    if(newIndex >= this.state.shoppingItems.length) {
        newIndex = 0;
    }
    this.setState({
        currentShoppingItem: {
            index: newIndex,
            title: this.state.shoppingItems[newIndex].title,
            description: this.state.shoppingItems[newIndex].description,
            price: this.state.shoppingItems[newIndex].price,
            img: this.state.shoppingItems[newIndex].img
        }
    })
  } 
  
  this.subtractTotalByPrice = function(price) {
    const newTotal = this.state.totalMoney - price;

    this.setState({
        totalMoney: newTotal
    })
  }

 this.handleDelete = function(index) {
    const updatedItemsArray = this.state.yourItems.filter((item, i) => {
        return i !== index
    })
    const currentlyEditingObject = this.state.currentlyEditing.index === index
      ? {}
      : this.state.currentlyEditing

    this.setState({
        yourItems: updatedItemsArray,
        currentlyEditing: currentlyEditingObject
    })

    return updatedItemsArray;
  }
this.validateUpdate = function() {
    let errorMessages = [];

    if (!this.state.currentlyEditing) {
      return false;
    }

    if (!this.state.currentlyEditing.price || this.state.currentlyEditing.price < 1) {
      errorMessages.push('Product must include a valid price of at least 1 Play Money')
    }

    if (errorMessages.length > 0) {
      this.setErrorMessages(errorMessages)
      return false;
    }

    else {
      return true;
    }
  }
  this.setErrorMessages = function(errorMessages) {
    this.setState({
      errorMessages: errorMessages,
      errorPopup: true
    })
  }

    this.updateCurrentShoppingItem = function(item) {
    item.index = this.state.currentShoppingItem.index-1;
    item.add = true;
    this.setState({
      currentShoppingItem: item
    })
  }

    this.handleChangeInput = function(e, index) {
    let newInput = Object.assign({}, this.state.currentlyEditing);

    if (this.state.currentlyEditing.index === index) {
      newInput[e.target.id] = e.target.value;
      this.setState({
        currentlyEditing: newInput
      })
    }

    else {

      newInput = Object.assign({}, this.state.yourItems[index])
      newInput.index = index;
      newInput[e.target.id] = e.target.value;

      this.setState({
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
    this.setState(newState){
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
            receiver.method(argument);

        }
    }

    this.functions = {

        handleChangeInput: this.handleChangeInput,
        updateProductState: this.updateProductState,
        handleDelete: this.handleDelete,
        updateCurrentShoppingItem: this.updateCurrentShoppingItem,
        getNewProductToSell: this.getNewProductToSell,
        removeItemFromState: this.removeItemFromState,
        subtractTotalByPrice: this.subtractTotalByPrice,
        setCurrentProductToLiked: this.setCurrentProductToLiked,
  
    }
  }

  export default new ProductDelegate();