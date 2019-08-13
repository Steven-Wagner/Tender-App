import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserInfo from './userInfo';
import Enzyme, { mount } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {ProductsProvider} from '../../context';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faSpinner, faCoins } from '@fortawesome/free-solid-svg-icons';

library.add(faCoins, faShoppingCart, faSpinner);

Enzyme.configure({ adapter: new Adapter() });
describe('User Info UI renders correctly', () => {
    const context = {
        userInfo: {
            username: 'Test User',
            money: '150.00',
            description: 'A description'
        }
    };

    function makeUserInfoWrapper() {
        return mount(
                <Router>
                    <ProductsProvider value={context}>
                        <UserInfo/>
                    </ProductsProvider>
                </Router>)
    }

    it('User Info renders username correctly', () => {
        expect(makeUserInfoWrapper().find('.name').text()).toBe(context.userInfo.username);
    })
    it('User Info renders money correctly', () => {
        expect(makeUserInfoWrapper().find('.total-money').text()).toBe(' ' + context.userInfo.money);
    })
    it('User Info renders description correctly', () => {
        expect(makeUserInfoWrapper().find('.user-description').text()).toBe(context.userInfo.description);
    })
})