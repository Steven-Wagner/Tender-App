import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import YourProduct from './yourProduct';
import Enzyme, { shallow, mount, render, setState, update } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {ProductsProvider} from '../context';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faSpinner, faCoins } from '@fortawesome/free-solid-svg-icons';
import ReactDOM from 'react-dom';

YourProduct.prototype.componentDidMount = () => {};

library.add(faCoins, faShoppingCart, faSpinner);

Enzyme.configure({ adapter: new Adapter() });
describe('Homepage UI renders correctly', () => {

    const item = {
        title: 'Your Product Item', 
        img: 'An img', 
        desription: 'Product description', 
        sold: '2', 
        profit: '4', 
        price: '2'};

    const adCosts = {
        'Annoying ads': '4',
        'Popup ads': '2',
        'Homepage ads': '1'
    }

    function makeYourProductWrapper() {
        return mount(
                <Router>
                    <YourProduct
                        item={item}
                        adCosts={adCosts}/>
                </Router>)
    }
    
    it('renders content without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <Router>
            {/* <ProductsProvider value={}> */}
                <YourProduct
                    item={item}
                    adCosts={adCosts}/>
            {/* </ProductsProvider> */}
        </Router> , div);
    });

    // it('Homepage renders users top sellers correctly', () => {
    //     const userPopularProduct = makeHomepageWrapper().find('.top-selling-item').at(0);
    //     expect(userPopularProduct.find('.product-title').text()).toBe(items.usersPopularProducts[0].title);
    //     expect(userPopularProduct.find('.profit').text()).toBe(`Profit: ${items.usersPopularProducts[0].profit}`);
    // })

    // it('Homepage renders top sellers correctly', () => {
    //     const popularProduct = makeHomepageWrapper().find('.top-selling-item').at(1);
    //     expect(popularProduct.find('.product-title').text()).toBe(items.popularProducts[0].title);
    //     expect(popularProduct.find('.popular-info').text()).toBe(`Sold: ${items.popularProducts[0].sold}`);
    // })
})