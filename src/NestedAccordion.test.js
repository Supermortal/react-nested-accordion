import React from 'react';
import ReactDOM from 'react-dom';

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NestedAccordion from './NestedAccordion';
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

it('processes items correctly in initialGetItemsProcessing', () => {

    const testItems = [
        { label: "Test1" },
        { label: "Test2" }
    ];

    const testObject = {
        getItems(item, resolve, reject) {

        },
        getItemContent(item) {
            return (
                <p>{item.label}</p>
            );
        }
    };

    const getItemContentSpy = jest.spyOn(testObject, 'getItemContent');

    const accordion = shallow(<NestedAccordion getItems={testObject.getItems} getItemContent={testObject.getItemContent} />);
    const accordionInstance = accordion.instance();

    let stateObject = {
        itemElements: [],
        contents: []
    };

    stateObject = accordionInstance.initialGetItemsProcessing(testItems, stateObject)

    expect(stateObject.itemElements).toBeDefined();
    expect(stateObject.itemElements).toHaveLength(1);
    expect(stateObject.itemElements[0]).toHaveLength(2);

    const firstItemElement = stateObject.itemElements[0][0];
    const firstItemElementWrapper = shallow(firstItemElement);
    expect(firstItemElementWrapper.html()).toEqual("<li class=\"accordion-item\"><div class=\"accordion-item-content\"><p>Test1</p></div></li>");

    const secondItemElement = stateObject.itemElements[0][1];
    const secondItemElementWrapper = shallow(secondItemElement);
    expect(secondItemElementWrapper.html()).toEqual("<li class=\"accordion-item\"><div class=\"accordion-item-content\"><p>Test2</p></div></li>");

    expect(getItemContentSpy).toBeCalledTimes(2);

    expect(stateObject.contents).toBeDefined();
    expect(stateObject.contents).toHaveLength(1);
    expect(stateObject.contents[0]).toHaveLength(2);

    const firstContent = stateObject.contents[0][0];
    const firstContentWrapper = shallow(firstContent);
    expect(firstContentWrapper.html()).toEqual("<p>Test1</p>");

    const secondContent = stateObject.contents[0][1];
    const secondContentWrapper = shallow(secondContent);
    expect(secondContentWrapper.html()).toEqual("<p>Test2</p>");
});

it('preps element arrays correctly', () => {

    const testObject = {
        getItems(item, resolve, reject) {

        },
        getItemContent(item) {
            return (
                <p>{item.label}</p>
            );
        }
    };

    const accordion = shallow(<NestedAccordion getItems={testObject.getItems} getItemContent={testObject.getItemContent} />);
    const accordionInstance = accordion.instance();

    const level = 0;
    const initialItemElements = [];
    const initialContents = [];

    const {
        itemElements,
        contents
    } = accordionInstance.prepElementArrays(initialItemElements, initialContents, level);

    expect(itemElements).toHaveLength(1);
    expect(itemElements[level]).toHaveLength(0);

    expect(contents).toHaveLength(1);
    expect(itemElements[level]).toHaveLength(0);

    const newLevel = 1;

    const updateObject = accordionInstance.prepElementArrays(itemElements, contents, newLevel);

    expect(updateObject.itemElements).toHaveLength(2);
    expect(updateObject.itemElements[newLevel]).toHaveLength(0);

    expect(updateObject.contents).toHaveLength(2);
    expect(updateObject.contents[newLevel]).toHaveLength(0);
});

it('creates item element correctly', () => {

    const testObject = {
        getItems(item, resolve, reject) {

        },
        getItemContent(item) {
            return (
                <p>{item.label}</p>
            );
        }
    };

    const accordion = shallow(<NestedAccordion getItems={testObject.getItems} getItemContent={testObject.getItemContent} />);
    const accordionInstance = accordion.instance();

    const item = {
        label: "Test Item"
    };
    const index = 0;
    const level = 0;
    const content = shallow(<p>Test Item</p>);

    const itemElement = accordionInstance.createItemElement(item, index, level, content);
    const itemElementWrapper = shallow(itemElement);

    expect(itemElement).toBeDefined();
    expect(itemElementWrapper.html()).toEqual("<li class=\"accordion-item\"><div class=\"accordion-item-content\"><p>Test Item</p></div></li>");
});

it('creates item elements correctly', () => {

    const testObject = {
        getItems(item, resolve, reject) {

        },
        getItemContent(item) {
            return (
                <p>{item.label}</p>
            );
        }
    };

    const accordion = shallow(<NestedAccordion getItems={testObject.getItems} getItemContent={testObject.getItemContent} />);
    const accordionInstance = accordion.instance();

    const items = [
        { label: "Test Item 1" },
        { label: "Test Item 2" },
        { label: "Test Item 3" },
        { label: "Test Item 4" }
    ];

    const initialContents = [
        []
    ];

    const initialItemElements = [
        []
    ];

    const level = 0;

    const { itemElements, contents } = accordionInstance.createItemElements(items, initialItemElements, initialContents, level);

    expect(itemElements).toBeDefined();
    expect(itemElements).toHaveLength(1);
    expect(itemElements[level]).toHaveLength(4);

    const firstItemElement = itemElements[level][0];
    expect(firstItemElement).toBeDefined();
    const firstItemElementWrapper = shallow(firstItemElement);
    expect(firstItemElementWrapper.html()).toEqual("<li class=\"accordion-item\"><div class=\"accordion-item-content\"><p>Test Item 1</p></div></li>");

    expect(contents).toBeDefined();
    expect(contents).toHaveLength(1);
    expect(contents[level]).toHaveLength(4);

    const firstContent = contents[level][0];
    expect(firstContent).toBeDefined();
    const firstContentWrapper = shallow(firstContent);
    expect(firstContentWrapper.html()).toEqual("<p>Test Item 1</p>");
});

it('checks for second click correctly', () => {

    const testObject = {
        getItems(item, resolve, reject) {

        },
        getItemContent(item) {
            return (
                <p>{item.label}</p>
            );
        },
        onChange(item) {

        }
    };

    const accordion = shallow(<NestedAccordion
        getItems={testObject.getItems}
        onChange={testObject.onChange}
        getItemContent={testObject.getItemContent} />);
    const accordionInstance = accordion.instance();

    const index = 0;
    const level = 0;
    const selectedIndicies = [];
    selectedIndicies[level] = index;

    let isSecondClick = accordionInstance.isSecondClick(selectedIndicies, index, level);
    expect(isSecondClick).toBeTruthy();

    const otherIndex = 1;
    selectedIndicies[level] = otherIndex;

    isSecondClick = accordionInstance.isSecondClick(selectedIndicies, index, level);
    expect(isSecondClick).toBeFalsy();
});

// it('handles second click correctly', () => {

//     const testObject = {
//         getItems(item, resolve, reject) {

//         },
//         getItemContent(item) {
//             return (
//                 <p>{item.label}</p>
//             );
//         },
//         onChange(item) {

//         }
//     };

//     const onChangeSpy = jest.spyOn(testObject, 'onChange');

//     const accordion = shallow(<NestedAccordion
//         getItems={testObject.getItems}
//         onChange={testObject.onChange}
//         getItemContent={testObject.getItemContent} />);
//     const accordionInstance = accordion.instance();

//     const selectedIndicies = [];
//     const item = {
//         label: "Test Item 1"
//     };
//     const index = 0;
//     const level = 0;

//     accordionInstance.handleSecondClick(selectedIndicies, item, index, level);

//     expect(onChangeSpy).toHaveBeenCalled();
// });

// it('cleans up old items correctly', () => {
//     expect(false).toBeTruthy();
// });

// it('sets selected index correctly', () => {
//     expect(false).toBeTruthy();
// });

// it('sets stored item correctly', () => {
//     expect(false).toBeTruthy();
// });

// it('replaces old elements correctly', () => {
//     expect(false).toBeTruthy();
// });

// it('cleans up array correct', () => {
//     expect(false).toBeTruthy();
// });
