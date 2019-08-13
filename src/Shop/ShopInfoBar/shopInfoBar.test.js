import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ShopInfoBar from './shopInfoBar';
import Enzyme, { shallow, mount, render, setState, update } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import ReactDOM from 'react-dom';

library.add(faCoins);

Enzyme.configure({ adapter: new Adapter() });

const totalMoney = '150.00';

function makeShopInfoBarWrapper() {
    return mount(
        <Router>
            <ShopInfoBar
                totalMoney={totalMoney}/>
        </Router>)
}

describe('UI renders correctly', () => {
    it('renders content without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Router>
                <ShopInfoBar
                    totalMoney={totalMoney}/>
            </Router> , div);
    });
      
    it('Shop renders correctly', () => {
        const tree = makeShopInfoBarWrapper();
        expect(tree).toMatchSnapshot();
        tree.unmount();
    });
})