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

it('creates item element correctly', () => {

    let getItemContent = (item) => {
        return (<div>{item.label}</div>);
    };
    let getLoadingComponent = undefined;
    let item = {
        label: "test-item"
    };
    let index = 0;
    let className = "test-class";
    let onItemClickHandler = () => {

    };
    let childItemElements = undefined;
    let isActive = false;
    let isLoading = false;


    let itemElement = createItemElement(getItemContent, getLoadingComponent, item, index, className, onItemClickHandler, childItemElements, isActive, isLoading);
    let itemElementWrapper = shallow(itemElement);

    expect(itemElement).toBeDefined();
    expect(itemElementWrapper.html()).toEqual("<li class=\"accordion-item\"><div class=\"accordion-item-content\"><div>test-item</div></div></li>");

    getLoadingComponent = undefined;
    isLoading = false;
    item = {
        label: "test-item-2"
    }
    childItemElements = [
        itemElement
    ];

    itemElement = createItemElement(getItemContent, getLoadingComponent, item, index, className, onItemClickHandler, childItemElements, isActive, isLoading);
    itemElementWrapper = shallow(itemElement);

    expect(itemElement).toBeDefined();
    expect(itemElementWrapper.html()).toEqual("<li class=\"accordion-item\"><div class=\"accordion-item-content\"><div>test-item-2</div></div><ul class=\"test-class\"><li class=\"accordion-item\"><div class=\"accordion-item-content\"><div>test-item</div></div></li></ul></li>");
});

it('sets item element as loading correctly during creation', () => {

    let getItemContent = (item) => {
        return (<div>{item.label}</div>);
    };
    let item = {
        label: "test-item"
    };
    let index = 0;
    let className = "test-class";
    let onItemClickHandler = () => {

    };
    let childItemElements = undefined;
    let isActive = false;

    let getLoadingComponent = () => <div>Loading...</div>;
    let isLoading = true;

    let itemElement = createItemElement(getItemContent, getLoadingComponent, item, index, className, onItemClickHandler, childItemElements, isActive, isLoading);
    let itemElementWrapper = shallow(itemElement);

    expect(itemElement).toBeDefined();
    expect(itemElementWrapper.html()).toEqual("<li class=\"accordion-item\"><div class=\"accordion-item-content\"><div>test-item</div></div><div>Loading...</div></li>");
});

it('sets item element as active correctly during creation', () => {

    let getItemContent = (item) => {
        return (<div>{item.label}</div>);
    };
    let getLoadingComponent = undefined;
    let item = {
        label: "test-item"
    };
    let index = 0;
    let className = "test-class";
    let onItemClickHandler = () => {

    };
    let childItemElements = undefined;
    let isActive = true;
    let isLoading = false;


    let itemElement = createItemElement(getItemContent, getLoadingComponent, item, index, className, onItemClickHandler, childItemElements, isActive, isLoading);
    let itemElementWrapper = shallow(itemElement);

    expect(itemElement).toBeDefined();
    expect(itemElementWrapper.html()).toEqual("<li class=\"accordion-item\"><div class=\"accordion-item-content active\"><div>test-item</div></div></li>");
});

it('constructs item elements correctly', () => {

        let getItemContent = (item) => {

        };
        let className = "test-class";
        let onChange = (item) => {

        };
        let onSecondClick = (item) => {

        };
        let getLoadingComponent = undefined;
        let props = {
            getItemContent,
            className,
            onChange,
            onSecondClick,
            getLoadingComponent
        };
        let selectedIndicies = [];
        let setSelectedIndicies = (selectedIndicies) => {

        };
        let items = [
            [
                {
                    label: "test-item"
                }
            ]
        ];
        let setItems = (items) => {

        };
        let loading = false;
        let level = 0;

        let itemElements = constructItemElements(props, selectedIndicies, setSelectedIndicies, items, setItems, loading, level);
        expect(itemElements).toBeDefined();
        expect(itemElements.length).toEqual(1);
});

it('constructs nested item elements correctly', () => {

    let getItemContent = (item) => {

    };
    let className = "test-class";
    let onChange = (item) => {

    };
    let onSecondClick = (item) => {

    };
    let getLoadingComponent = undefined;
    let props = {
        getItemContent,
        className,
        onChange,
        onSecondClick,
        getLoadingComponent
    };
    let selectedIndicies = [];
    let setSelectedIndicies = (selectedIndicies) => {

    };
    let items = [
        [
            {
                label: "test-item"
            }
        ]
    ];
    let setItems = (items) => {

    };
    let loading = false;
    let level = 0;

    let itemElements = constructItemElements(props, selectedIndicies, setSelectedIndicies, items, setItems, loading, level);
    expect(itemElements).toBeDefined();
    expect(itemElements.length).toEqual(1);
    expect(true).toBeFalsy();
});