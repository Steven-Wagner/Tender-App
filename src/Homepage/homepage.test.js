import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Homepage from './homepage';
import Enzyme, { mount } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {ProductsProvider} from '../context';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faSpinner, faCoins } from '@fortawesome/free-solid-svg-icons';
import ReactDOM from 'react-dom';

Homepage.prototype.componentDidMount = () => {};

library.add(faCoins, faShoppingCart, faSpinner);

Enzyme.configure({ adapter: new Adapter() });
describe('Homepage UI renders correctly', () => {

    const items = {
        popularProducts: [{title: 'Overall Test Title', img: 'An img', desription: 'SHould not display', sold: '2', profit: '4', price: '2'}],
        usersPopularProducts: [{title: 'User Test Title', img: 'An img', desription: 'SHould not display', sold: '2', profit: '4', price: '2'}],
        userInfo: {
            username: 'Test User',
            money: '150.00'
        }
    };

    function makeHomepageWrapper() {
        return mount(
                <Router>
                    <ProductsProvider value={items}>
                        <Homepage/>
                    </ProductsProvider>
                </Router>)
    }
    
    it('renders content without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <Router>
            <ProductsProvider value={items}>
                <Homepage/>
            </ProductsProvider>
        </Router> , div);
    });

    it('Homepage renders users top sellers correctly', () => {
        const userPopularProduct = makeHomepageWrapper().find('.top-selling-item').at(0);
        expect(userPopularProduct.find('.product-title').text()).toBe(items.usersPopularProducts[0].title);
        expect(userPopularProduct.find('.profit').text()).toBe(`Profit: ${items.usersPopularProducts[0].profit}`);
    })

    it('Homepage renders top sellers correctly', () => {
        const popularProduct = makeHomepageWrapper().find('.top-selling-item').at(1);
        expect(popularProduct.find('.product-title').text()).toBe(items.popularProducts[0].title);
        expect(popularProduct.find('.popular-info').text()).toBe(`Sold: ${items.popularProducts[0].sold}`);
    })
})