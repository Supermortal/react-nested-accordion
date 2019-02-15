import React from 'react';
import ReactDOM from 'react-dom';
import NestedAccordion from './NestedAccordion';

it('renders without crashing', () => {
    const getItems = (item) => {

    };

    const div = document.createElement('div');
    ReactDOM.render(<NestedAccordion getItems={getItems} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('calls get items on render', () => {
    const testObject = {
        getItems(item) {

        }
    };
    const spy = jest.spyOn(testObject, 'getItems');

    const div = document.createElement('div');
    ReactDOM.render(<NestedAccordion getItems={testObject.getItems} />, div);
    ReactDOM.unmountComponentAtNode(div);

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
});
