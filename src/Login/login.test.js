import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './login';
import Enzyme, { shallow, mount, render, setState, update } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {ProductsProvider} from '../context';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faSpinner, faCoins } from '@fortawesome/free-solid-svg-icons';

library.add(faCoins, faShoppingCart, faSpinner);

Enzyme.configure({ adapter: new Adapter() });

describe('Login UI renders correctly', () => {

    function makeLoginWrapper() {
        Login.prototype.componentDidMount = () => {};
        return mount(
                    <Router>
                        <ProductsProvider value={{}}>
                            <Login/>
                        </ProductsProvider>
                    </Router>)
    }

    it('Login renders with all correct fields', () => {
        expect(makeLoginWrapper().find('#username').length).toBe(1);
        expect(makeLoginWrapper().find('#password').length).toBe(1);
    })

    describe('error popup pops up when error is triggered', () => {
        it('Renders error messages when errors are present', () => {
            const wrapper = makeLoginWrapper();
            wrapper.find('Login').setState({errorMessages: ['Username is required', 'Password is required']})
            expect(wrapper.find('.error').length).toBe(2);
        })
    })
    describe('Loading Icon', () => {
        it('Loading Icon renders', () => {
            const wrapper = makeLoginWrapper();
            wrapper.find('Login').setState({loading: true})

            expect(wrapper.find('.loading-spinner').length).toBe(2);
        })
        it('Loading Icon does not render', () => {
            const wrapper = makeLoginWrapper();
            wrapper.find('Login').setState({loading: false})
            expect(wrapper.find('.loading-spinner').length).toBe(0);
        })
    })
})