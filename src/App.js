import React, {Component} from 'react';
import { Route} from "react-router-dom";
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yourItems: mockData.yourTopItems,
    }
  }

  render() {
    return (
      <main className='App'>
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

export default App;
