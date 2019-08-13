import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import YourProducts from './yourProducts';
import Enzyme, { mount } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {ProductsProvider} from '../context';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faSpinner, faCoins } from '@fortawesome/free-solid-svg-icons';
import ReactDOM from 'react-dom';

YourProducts.prototype.componentDidMount = () => {};

library.add(faCoins, faShoppingCart, faSpinner);

Enzyme.configure({ adapter: new Adapter() });
describe('YourProducts UI renders correctly', () => {

    const context = {
        currentlyEditing: {
            title: 'Your Product Test Title', 
            img: 'An img', 
            desription: 'A Description', 
            sold: '2', 
            profit: '4', 
            price: '2',
            ad: 'Homepage ads',
            id: 1,
            index: 0},
        yourItems: [
            {title: 'Your Product Test Title', 
            img: 'An img', 
            desription: 'A Description',
            ad: 'Homepage ads',
            sold: '2', 
            profit: '4', 
            price: '2',
            id: 1}]
    };

    function makeYourProductsWrapper(context) {
        return mount(
                <Router>
                    <ProductsProvider value={context}>
                        <YourProducts/>
                    </ProductsProvider>
                </Router>)
    }
    
    it('renders content without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <Router>
            <ProductsProvider value={context}>
                <YourProducts/>
            </ProductsProvider>
        </Router> , div);
    });

    it('If product being rendered is currently being edited it renders with edited content', () => {
        const productWithEditedValues = Object.assign({}, context.currentlyEditing);
        productWithEditedValues.title = 'Edited Title';
        productWithEditedValues.img = 'Edited Img';
        productWithEditedValues.description = 'Edited description';
        productWithEditedValues.price = '3';
        productWithEditedValues.ad = 'Annoying ads';

        const editedContext = {yourItems: context.yourItems, currentlyEditing: productWithEditedValues};

        const wrapper = makeYourProductsWrapper(editedContext);

        expect(wrapper.find('.title-content').text()).toBe(productWithEditedValues.title);
        expect(wrapper.find('.product-pic').prop('src')).toBe(productWithEditedValues.img);
        expect(wrapper.find('.description').text()).toBe(productWithEditedValues.description);
        expect(wrapper.find('.price-chooser').find('input').prop('value')).toBe(productWithEditedValues.price);
        expect(wrapper.find('.select-ad').prop('value')).toBe(productWithEditedValues.ad);

        wrapper.unmount();

    })
})