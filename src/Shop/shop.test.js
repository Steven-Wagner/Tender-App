import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Shop from './shop';
import Enzyme, { shallow, mount, render, setState, update } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {ProductsProvider} from '../context';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faSpinner, faCoins } from '@fortawesome/free-solid-svg-icons';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

library.add(faCoins, faShoppingCart, faSpinner);

const canAfford = jest.fn((price) => true);
const removeItemFromState = jest.fn((productIndex) => productIndex);
const subtractTotalByPrice = jest.fn((price) => price);
const getNewProductToSell = jest.fn((zeroOrOne) => zeroOrOne)
const newPurchasedItem = jest.fn((currentShoppingItem, id) => {
    return {currentShoppingItem: currentShoppingItem, id: id}
});
const fetchPostPurchase = jest.fn(() => Promise.resolve(1));

Shop.prototype.fetchPostPurchase = fetchPostPurchase;

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
    canAfford,
    removeItemFromState,
    subtractTotalByPrice,
    getNewProductToSell,
    newPurchasedItem
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
        ReactDOM.unmountComponentAtNode(div);
    });
      
    it('Shop renders correctly', () => {
        const tree = renderer.create(
            <Router>
                <ProductsProvider value={context}>
                    <Shop
                        history={{location: ''}}/>
                </ProductsProvider>
            </Router>
        )
        .toJSON();
        expect(tree).toMatchSnapshot();
    });
})

function makeShopWrapper() {
    Shop.prototype.componentDidMount = () => {};
    return mount(
            <Router>
                <ProductsProvider value={context}>
                    <Shop
                        history={{location: ''}}/>
                </ProductsProvider>
            </Router>)
}

// describe('handleBuy() Calls Functions with right arguments', () => {
//     it('user clicks buy and correct functions are called', () => {
//         const wrapper = makeShopWrapper();

//         wrapper.find('.buy-button').simulate('click');
//         expect(canAfford.mock.calls.length).toBe(1);
//         expect(canAfford.mock.calls[0][0]).toBe(context.currentShoppingItem.price);
//         expect(fetchPostPurchase.mock.results[0].value).toBe(1);
//         expect(removeItemFromState.mock.results[0].value).toBe(context.currentShoppingItem.index);
//         expect(subtractTotalByPrice.mock.result[0].value).toBe(context.currentShoppingItem.price);
//         expect(newPurchasedItem.mock.result[0].value.currentShoppingItem).toBe(context.currentShoppingItem);
//         expect(getNewProductToSell.mock.result[0].value).toBe(0);
//     })
// })
