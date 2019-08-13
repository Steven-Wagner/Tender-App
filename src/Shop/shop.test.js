import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Shop from './shop';
import Enzyme, { mount } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {ProductsProvider} from '../context';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faSpinner, faCoins } from '@fortawesome/free-solid-svg-icons';
import ReactDOM from 'react-dom';

library.add(faCoins, faShoppingCart, faSpinner);

Shop.prototype.componentDidMount = () => {};

Enzyme.configure({ adapter: new Adapter() });

const context = {
    userInfo: {
        username: 'Test User',
        money: '150.00'
    },
    currentShoppingItem: {
        title: 'Current Item',
        Img: 'No Img',
        price: '10.00',
        desription: 'A Description',
        index: 0,
        id: 1
    },
};

describe('UI renders correctly', () => {
    it('renders content without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Router>
            <ProductsProvider value={context}>
                <Shop
                    history={{location: ''}}/>
            </ProductsProvider>
            </Router> , div);
    });
      
    it('Shop renders correctly', () => {
        const tree = makeShopWrapper();
        expect(tree).toMatchSnapshot();
    });
})

function makeShopWrapper() {
    return mount(
            <Router>
                <ProductsProvider value={context}>
                    <Shop
                        history={{location: ''}}/>
                </ProductsProvider>
            </Router>)
}
