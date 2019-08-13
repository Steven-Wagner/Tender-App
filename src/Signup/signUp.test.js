import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {SignUp} from './signUp';
import Enzyme, { mount } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {ProductsProvider} from '../context';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faSpinner, faCoins } from '@fortawesome/free-solid-svg-icons';
import ReactDOM from 'react-dom';

library.add(faCoins, faShoppingCart, faSpinner);

Enzyme.configure({ adapter: new Adapter() });

SignUp.prototype.componentDidMount = () => {};

describe('SignUp UI renders correctly', () => {

    function makeLoginWrapper() {
        return mount(
                    <Router>
                        <ProductsProvider value={{}}>
                            <SignUp/>
                        </ProductsProvider>
                    </Router>)
    }

    it('renders content without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Router>
                <ProductsProvider value={{}}>
                    <SignUp/>
                </ProductsProvider>
            </Router> , div);
      });

    it('SignUp renders with all correct fields', () => {
        expect(makeLoginWrapper().find('#username').length).toBe(1);
        expect(makeLoginWrapper().find('#password').length).toBe(1);
        expect(makeLoginWrapper().find('#description').length).toBe(1);
    })

    describe('error popup pops up when error is triggered', () => {
        it('Renders error messages when errors are present', () => {
            const wrapper = makeLoginWrapper();
            wrapper.find('SignUp').setState({errorMessages: ['Username is required', 'Password is required']})
            expect(wrapper.find('.error').length).toBe(2);
        })
    })
    describe('Loading Icon', () => {
        it('Loading Icon renders', () => {
            const wrapper = makeLoginWrapper();
            wrapper.find('SignUp').setState({loading: true})

            expect(wrapper.find('.loading-spinner').length).toBe(2);
        })
        it('Loading Icon does not render', () => {
            const wrapper = makeLoginWrapper();
            wrapper.find('SignUp').setState({loading: false})
            expect(wrapper.find('.loading-spinner').length).toBe(0);
        })
    })
})