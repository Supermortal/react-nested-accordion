import React from 'react';
import ReactDOM from 'react-dom';

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NestedAccordion from './NestedAccordionHooks';
import { testData } from './testData';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const getItems = (item) => {

    };
    const getItemContent = (item) => {

    };

    const div = document.createElement('div');
    ReactDOM.render(<NestedAccordion getItems={getItems} getItemContent={getItemContent} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('has correct initial html', () => {
    const getItems = (item) => {

    };
    const getItemContent = (item) => {

    };

    const accordion = shallow(<NestedAccordion getItems={getItems} getItemContent={getItemContent} />);

    expect(accordion.html()).toEqual("<ul class=\"nested-accordion\"></ul>");
});

it('calls get items on render', () => {
    const testObject = {
        getItems(item) {

        },
        getItemContent(item) {

        }
    };
    const spy = jest.spyOn(testObject, 'getItems');

    const div = document.createElement('div');
    ReactDOM.render(<NestedAccordion getItems={testObject.getItems} getItemContent={testObject.getItemContent} />, div);
    ReactDOM.unmountComponentAtNode(div);

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
});