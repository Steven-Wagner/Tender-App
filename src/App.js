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


import delegate from './Products/productDelegate.js';

class App extends Component {

  constructor(props) {


    super(props);

    delegate.register(this, this.updateProductsState, this.getAppInfo);
    
    this.canAfford = this.canAfford.bind(this);
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
      
      ...delegate.functions,
      setErrorMessages: this.setErrorMessages
    }
  }

  getAppInfo(){
    return {
      appName: "My App",
      showTitle: true
    }
  }

  updateProductsState = function(newProductsState){
    this.setState({
      ...this.state,
      ...newProductsState
    })
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

    goBack() {
    this.props.history.goBack();
  }
  
  //Your Products



  render() {

    console.log('render state', this.state.currentShoppingItem);

    const displayErrorPopup = this.state.errorPopup
      ? <ErrorPopup 
        removePopup={delegate.functions.removePopup} 
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
