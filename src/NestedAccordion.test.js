import React from 'react';
import ReactDOM from 'react-dom';

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NestedAccordion, { 
    checkForSecondClick,
    cleanUpArray,
    constructItemElements,
    createItemElement,
    onItemClick
} from './NestedAccordion';
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

it('checks for second click correctly', () => {

    let selectedIndicies = [0, 1];
    let index = 1;
    let level = 1;

    let isSecondClick = checkForSecondClick(selectedIndicies, index, level);

    expect(isSecondClick).toBeTruthy();

    index = 2;

    isSecondClick = checkForSecondClick(selectedIndicies, index, level);

    expect(isSecondClick).toBeFalsy();
});

it('cleans up array correctly', () => {

    let array = [];
    let level = 0;

    array = cleanUpArray(array, level);

    expect(array.length).toEqual(0);

    array = [
        [],
        [],
        []
    ];

    array = cleanUpArray(array, level);

    expect(array.length).toEqual(1);

    array = [
        [],
        [],
        [],
        []
    ];

    level = 2;

    array = cleanUpArray(array, level);

    expect(array.length).toEqual(3);

    array = [
        [],
        [],
        [],
        []
    ];

    level = 1;

    array = cleanUpArray(array, level);

    expect(array.length).toEqual(2);
});