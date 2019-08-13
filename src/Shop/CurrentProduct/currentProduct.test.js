import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CurrentProduct from './currentProduct';
import Enzyme, { shallow, mount, render, setState, update } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { library } from '@fortawesome/fontawesome-svg-core';
// import { faCoins } from '@fortawesome/free-solid-svg-icons';
import ReactDOM from 'react-dom';

// library.add(faCoins);

Enzyme.configure({ adapter: new Adapter() });

const item = {
    title: 'Current Product', 
    img: 'Current img', 
    desription: 'Current Product description', 
    sold: '2', 
    profit: '4', 
    price: '2',
    index: 0};

function makeCurrentProductWrapper(item) {
    return mount(
        <Router>
            <CurrentProduct
                item={item}/>
        </Router>)
}

describe('Current Product UI renders correctly', () => {
    it('renders content without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Router>
                <CurrentProduct
                    item={item}/>
            </Router> , div);
    });
      
    it('Shop renders correctly', () => {
        const tree = makeCurrentProductWrapper(item);
        expect(tree).toMatchSnapshot();
        tree.unmount();
    });

    describe('img displays', () => {
        const imgContent = [{display: true, src: 'An img'}, {display: false, src: ''}]

        imgContent.forEach(img => {
            it(`Img displays ${img.display} if item.img ${img.display ? 'has content' : 'is undefined'}`, () => {
                const imgItem = Object.assign({}, item);
                imgItem.img = img.src;
                const wrapper = makeCurrentProductWrapper(imgItem);
                expect(wrapper.exists('.product-pic')).toBe(img.display)
                wrapper.unmount();
            })
        })
    })

    describe('Renders no more products to view', () => {
        it('When no products to show', () => {
            const emptyItem = {index: -1};

            const wrapper = makeCurrentProductWrapper(emptyItem);
            
            expect(wrapper.exists('.no-products')).toBe(true);
            wrapper.unmount();
        })
        it('Renders ad product even if no products in shoppingItems', () => {
            const adItem = Object.assign({}, item);
            delete adItem.index
            adItem.ad = true

            const wrapper = makeCurrentProductWrapper(adItem);
            expect(wrapper.exists('.no-products')).toBe(false);
            wrapper.unmount();
        })
    })
})