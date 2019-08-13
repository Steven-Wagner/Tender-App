import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PurchasedItem from './purchasedItem';
import Enzyme, { shallow, mount, render, setState, update } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import ReactDOM from 'react-dom';


Enzyme.configure({ adapter: new Adapter() });

const item = {
    title: 'Purchased Product', 
    img: 'Purchased img', 
    desription: 'Purchased description', 
    sold: '2', 
    profit: '4', 
    price: '2',
    id: 1,
    bonus: 0};

function makePurchasedItemWrapper(item) {
    return mount(
        <Router>
            <PurchasedItem
                item={item}/>
        </Router>)
}

describe('PurchasedItem UI renders correctly', () => {
    it('renders content without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Router>
                <PurchasedItem
                    item={item}/>
            </Router> , div);
    });

    describe('img displays', () => {
        const imgContent = [{display: true, src: 'An img'}, {display: false, src: ''}]

        imgContent.forEach(img => {
            it(`Img displays ${img.display} if item.img ${img.display ? 'has content' : 'is undefined'}`, () => {
                const imgItem = Object.assign({}, item);
                imgItem.img = img.src;
                const wrapper = makePurchasedItemWrapper(imgItem);
                expect(wrapper.exists('.product-pic')).toBe(img.display)
                wrapper.unmount();
            })
        })
    })
})