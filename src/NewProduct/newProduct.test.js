import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NewProduct from './newProduct';
import Enzyme, { shallow, mount, render, setState, update } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {ProductsProvider} from '../context';
import ReactDOM from 'react-dom';

NewProduct.prototype.componentDidMount = () => {};

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../services/Token-services');

function makeNewProductWrapper() {
    return mount(
            <Router>
                <ProductsProvider value={context}>
                    <NewProduct/>
                </ProductsProvider>
            </Router>)
}

const context = {
    userInfo: {
        username: 'Test User',
        money: '150.00'
    }
};

describe('NewProduct UI renders correctly', () => {
    it('renders content without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Router>
                <ProductsProvider value={context}>
                    <NewProduct/>
                </ProductsProvider>
            </Router> , div);
    });
      
    it('NewProduct renders correctly', () => {
        const tree = makeNewProductWrapper();
        expect(tree).toMatchSnapshot();
    });
})