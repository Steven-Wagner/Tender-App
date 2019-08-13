import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PurchasedItems from './purchasedItems';
import Enzyme, { mount } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {ProductsProvider} from '../context';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import ReactDOM from 'react-dom';

library.add(faShoppingCart);

PurchasedItems.prototype.componentDidMount = () => {};

Enzyme.configure({ adapter: new Adapter() });

const context = {
    purchasedItems: [
        {title: 'Your Product Test Title', 
        img: 'An img', 
        desription: 'A Description',
        ad: 'Homepage ads',
        sold: '2', 
        profit: '4', 
        price: '2',
        id: 1,
        bonus: '1.00'},

        {title: 'Your Product Test Title 2', 
        img: 'An img 2', 
        desription: 'A Description 2',
        ad: 'Homepage ads 2',
        sold: '4', 
        profit: '12', 
        price: '3',
        id: 2,
        bonus: '1.00'},
    ]
};

function makePurchasedItemsWrapper(context) {
    return mount(
        <Router>
            <ProductsProvider value={context}>
                <PurchasedItems/>
            </ProductsProvider>
        </Router>)
}

describe('Purchased Items UI renders correctly', () => {
    it('renders content without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Router>
                <ProductsProvider value={context}>
                    <PurchasedItems/>
                </ProductsProvider>
            </Router> , div);
    });
      
    it('PurchasedItems renders correctly', () => {
        const tree = makePurchasedItemsWrapper(context);
        expect(tree).toMatchSnapshot();
    });

    it('Correct amount of items are rendered', () => {
        const wrapper = makePurchasedItemsWrapper(context);
        expect(wrapper.find('.purchased-product').length).toBe(2);
        wrapper.unmount();
    })
});