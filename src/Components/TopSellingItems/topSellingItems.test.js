import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import TopSellingItems from './topSellingItems';
import Enzyme, { mount } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

function makeTopSellingWrapper(status) {
    const items = [{title: 'Test Title', img: 'An img', desription: 'SHould not display', sold: '2', profit: '4', price: '2'}];
    return mount(
            <Router>
                <TopSellingItems
                    status={status}
                    popularProducts={items}
                    />
            </Router>);
}

describe('Top Selling UI renders correctly', () => {
    describe('Top Selling renders with profit or not', () => {
        const statusOptions = [{status:'user', profit: true, heading: 'Your Top Selling Items'}, {status: 'overall', profit: false, heading: 'Top Selling Items'}];

        statusOptions.forEach(option => {
            const topSellingItemsWrapper = makeTopSellingWrapper(option.status);

            it(`Top Selling returns with profit: ${option.profit}`, () => {
                expect(topSellingItemsWrapper.find('TopSellingItems').state().includeProfit).toBe(option.profit);
            })
            it(`Top Selling returns with heading: ${option.heading}`, () => {
                expect(topSellingItemsWrapper.find('TopSellingItems').find('h2').text()).toBe(option.heading);
            })
        })
    })
})