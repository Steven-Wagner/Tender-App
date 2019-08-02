import React, {Component} from 'react';
import {Route, withRouter} from "react-router-dom";
import {ProductsProvider} from './context';
import delegate from './productDelegate';
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
import Popup from './Components/Popup/popup'
import TokenService from './services/Token-services';

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      yourItems: [],
      shoppingItems: [],
      purchasedItems: [],
      userInfo: '',
      popularProducts: [],
      usersPopularProducts: [],
      currentlyEditing: '',
      errorPopup: {status: false, messages: ''},
      popup: {status: false, messages: ''},
      totalMoney: mockData.user[0].money,
      currentShoppingItem: {
        index: -1
      },
      ...delegate.functions,
      canAfford: this.canAfford.bind(this),
      goBack: this.goBack.bind(this),
      changeUser: this.changeUser.bind(this),

      setPopupMessages: this.setPopupMessages.bind(this),
      removePopup: this.removePopup.bind(this)
    }

    this.updateProductsState = this.updateProductsState.bind(this);
    this.refreshUserData = this.refreshUserData.bind(this)

    delegate.register(this, this.updateProductsState)
  }

  componentDidMount() {
    this.refreshUserData();
  }

  async changeUser(user_id) {
    return await delegate.fetchGetUserInfo(user_id)
    .then(userInfo => {
      this.setState({
        userInfo: userInfo.userInfo
      })
      delegate.fetchYourProducts(user_id)
      .then(yourProducts => {
        console.log('your products', yourProducts)
        this.setState({
          yourItems: yourProducts
        })
      })
      delegate.fetchGetShopProducts(user_id)
      .then(shoppingItems => {
        this.setState({
          shoppingItems
        })
        delegate.getNewProductToSell();
      })
      delegate.fetchPurchasedProducts(user_id)
      .then(purchasedProducts => {
        this.setState({
          purchasedItems: purchasedProducts
        })
      })
      delegate.fetchGetUsersPopularProducts(user_id)
      .then(usersPopularProducts => {
        this.setState({
          usersPopularProducts: usersPopularProducts
        })
      })
      delegate.fetchGetPopularProducts(user_id)
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

  refreshUserData() {
    const userSignedIn = TokenService.getUserId();
    if(userSignedIn) {
      this.changeUser({id: userSignedIn})
    }
  }
 
  setPopupMessages(popupToPop, messages) {
    return this.setState({
        [popupToPop]: {
          messages: messages,
          status: true
        }
    })
  }

  removePopup(popupToRemove) {
    return this.setState({
        [popupToRemove]: {
          status: false,
          messages: ''
        }
    })
  }

  updateProductsState(newProductsState) {
    return this.setState({
      ...this.state,
      ...newProductsState
    })
  }

  canAfford(price) {
    if (this.state.totalMoney < price) {
        return false;
    }
    else {
        return true;
    }
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {

    const displayErrorPopup = this.state.errorPopup.status
      ? <ErrorPopup 
        removePopup={this.removePopup.bind(this)} 
        errorMessages={this.state.errorPopup.messages}/>
      : '';
    
    const displayPopup = this.state.popup.status
      ? <Popup 
        removePopup={this.removePopup.bind(this)} 
        messages={this.state.popup.messages}/>
      : '';

    return (
      <main className='App'>
        {displayErrorPopup}
        {displayPopup}
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
