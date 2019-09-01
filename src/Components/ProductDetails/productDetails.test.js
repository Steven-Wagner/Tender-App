import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductDetails from './productDetails';
import Enzyme, { mount } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
describe('Product Details UI renders correctly', () => {
    describe('Product Details renders correctly', () => {
        const handleClick = jest.fn(value => value);
            
        const item = {title: 'Test Title', img: 'An img', desription: 'SHould not display', sold: '2', profit: '4', price: '2'}
        const productDetailsWrapper = mount(
                <Router>
                    <ProductDetails
                        item={item}
                        handleClick={handleClick}
                        />
                </Router>);

        it('product details are clickable and item is passed as argument', () => {
            productDetailsWrapper.find('.top-selling-item').simulate('click');
            expect(handleClick.mock.calls.length).toBe(1);
            expect(handleClick.mock.results[0].value).toBe(item);
        })
    })
})