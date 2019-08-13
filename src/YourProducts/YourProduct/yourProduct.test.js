import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import YourProduct from './yourProduct';
import Enzyme, { mount } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faSpinner, faCoins } from '@fortawesome/free-solid-svg-icons';
import ReactDOM from 'react-dom';

YourProduct.prototype.componentDidMount = () => {};

library.add(faCoins, faShoppingCart, faSpinner);

Enzyme.configure({ adapter: new Adapter() });
describe('Homepage UI renders correctly', () => {

    const item = {
        title: 'Your Product Item', 
        img: 'An img', 
        desription: 'Product description', 
        sold: '2', 
        profit: '4', 
        price: '2'};

    const adCosts = {
        'Annoying ads': '4',
        'Popup ads': '2',
        'Homepage ads': '1'
    }

    const handleChangeInput = jest.fn();

    function makeYourProductWrapper() {
        return mount(
                <Router>
                    <YourProduct
                        item={item}
                        adCosts={adCosts}
                        handleChangeInput={handleChangeInput}/>
                </Router>)
    }
    
    it('renders content without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <Router>
                <YourProduct
                    item={item}
                    adCosts={adCosts}/>
        </Router> , div);
    });

    describe('Img displayed', () => {
        it('img does not display if url is undefined', () => {
            const emptyImgItem = Object.assign({}, item);
            emptyImgItem.img = '';
            const wrapper = mount(
                <Router>
                    <YourProduct
                        item={emptyImgItem}
                        adCosts={adCosts}
                        handleChangeInput={handleChangeInput}/>
                </Router>);
            expect(wrapper.exists('product-pic')).toBe(false);
            wrapper.unmount();
        })
        it('img displays if url is present', () => {
            const wrapper = makeYourProductWrapper();
            expect(wrapper.exists('.product-pic')).toBe(true);
            wrapper.unmount();
        })
    })

    describe('edit popups render correctly', () => {
        const editTypes = ['title', 'img', 'description'];

        it('Edit popup does not render on page load', () => {
            const wrapper = makeYourProductWrapper();
            expect(wrapper.exists('EditPopup')).toBe(false);
            wrapper.unmount();
        })

        editTypes.forEach(type => {
            it(`${type} edit popup renders`, () => {
                const wrapper = makeYourProductWrapper();
                wrapper.find('YourProduct').setState({
                    editPopup: {
                        type: type,
                        status: true
                    }
                })
                expect(wrapper.exists('EditPopup')).toBe(true);
                wrapper.unmount();
            })
        })
    })
})