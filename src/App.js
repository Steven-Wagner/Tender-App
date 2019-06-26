import React, {Component} from 'react';
import {Route, withRouter} from "react-router-dom";
import {ProductsProvider} from './context';
import mockData from './mockData';
import LandingPage from './landingPage/landingPage';
import Login from './Login/login';
import Homepage from './Homepage/homepage';
import Shop from './Shop/shop';
import NewProduct from './NewProduct/newProduct';
import PurchasedItems from './PurchasedItems/purchasedItems';
import SignUp from './Signup/signUp';
import YourProducts from './YourProducts/yourProducts';
import ErrorPopup from './Components/ErrorPopup/errorPopup';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.updateProductState = this.updateProductState.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.removePopup = this.removePopup.bind(this);
    this.validateUpdate = this.validateUpdate.bind(this);
    this.setErrorMessages = this.setErrorMessages.bind(this);
    this.updateCurrentShoppingItem = this.updateCurrentShoppingItem.bind(this);
    this.getNewProductToSell = this.getNewProductToSell.bind(this);
    this.canAfford = this.canAfford.bind(this);
    this.removeItemFromState = this.removeItemFromState.bind(this);
    this.subtractTotalByPrice = this.subtractTotalByPrice.bind(this);
    this.setCurrentProductToLiked = this.setCurrentProductToLiked.bind(this);
    this.goBack = this.goBack.bind(this);
    
    this.state = {
      yourItems: mockData.yourTopItems,
      shoppingItems: mockData.shoppingItems,
      userInfo: mockData.user[0],
      currentlyEditing: '',
      errorPopup: false,
      errorMessages: '',
      totalMoney: mockData.user[0].money,
      currentShoppingItem: {
        index: -1
      },
      
      handleChangeInput: this.handleChangeInput,
      updateProductState: this.updateProductState,
      handleDelete: this.handleDelete,
      updateCurrentShoppingItem: this.updateCurrentShoppingItem,
      getNewProductToSell: this.getNewProductToSell,

      canAfford: this.canAfford.bind(this),
      removeItemFromState: this.removeItemFromState.bind(this),
      subtractTotalByPrice: this.subtractTotalByPrice.bind(this),
      setCurrentProductToLiked: this.setCurrentProductToLiked.bind(this),
      goBack: this.goBack.bind(this),

      setErrorMessages: this.setErrorMessages
    }
  }

  componentDidMount() {
    this.getNewProductToSell();
  }

  //Shop

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

  setCurrentProductToLiked() {
    this.setState({
        currentShoppingItem:{
            liked: true
        }
    })
  }

  goBack() {
    this.props.history.goBack();
  }

  getNewProductToSell() {
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

  updateCurrentShoppingItem(item) {
    item.index = this.state.currentShoppingItem.index-1;
    item.add = true;
    this.setState({
      currentShoppingItem: item
    })
  }


  //Your Products
  handleChangeInput(e, index) {
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

  updateProductState(index) {
    const updatedItemsArray =  JSON.parse(JSON.stringify(this.state.yourItems));
    updatedItemsArray[index] = Object.assign({}, this.state.currentlyEditing);

    if (this.validateUpdate()) {
      this.setState({
          yourItems: updatedItemsArray,
          currentlyEditing: ''
      })
    }

    return updatedItemsArray
  }

  validateUpdate() {
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

  setErrorMessages(errorMessages) {
    this.setState({
      errorMessages: errorMessages,
      errorPopup: true
    })
  }

  removePopup() {
    this.setState({
      errorPopup: false,
      errorMessages: ''
    })
  }

  handleDelete(index) {
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

  render() {

    console.log('render state', this.state.currentShoppingItem);

    const displayErrorPopup = this.state.errorPopup
      ? <ErrorPopup 
        removePopup={this.removePopup} 
        errorMessages={this.state.errorMessages}/>
      : ''

    return (
      <main className='App'>
        {displayErrorPopup}
        <ProductsProvider value={this.state}>
          <Route
            exact path="/"
            component={LandingPage}
          />
          <Route
            exact path='/login/'
            component={Login}
          />
          <Route
            exact path='/signup/'
            component={SignUp}
          />
          <Route
            exact path="/homepage/"
            component={Homepage}
          />
          <Route
            exact path="/shop/"
            component={Shop}
          />
          <Route
            exact path="/newproduct/"
            component={NewProduct}
          />
          <Route
            exact path="/purchaseditems/"
            component={PurchasedItems}
          />
          <Route
            exact path="/yourproducts/"
            component={YourProducts}
          />
        </ProductsProvider>
      </main>
    );
  }
}

export default withRouter(App);
