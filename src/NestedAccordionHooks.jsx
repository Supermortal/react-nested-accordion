import React, { useState } from 'react';
import classNames from 'classnames';

export const prepElementArrays = (itemElements, contents, level) => {
    itemElements[level] = [];
    contents[level] = [];
    return {
        itemElements,
        contents
    };
};

export const createItemElement = (className, item, index, level, content, childItemElements, isActive = false) => {

    const accordionItemContentClasses = classNames("accordion-item-content", {
        active: isActive
    });

    const itemElement = (
        <li className="accordion-item" key={index}>
            <div className={accordionItemContentClasses}
            // onClick={onItemClick(item, index, level)}
            >
                {content}
            </div>
            {(childItemElements) ? <ul className={(className) ? className : "nested-accordion"}>{childItemElements}</ul> : null}
        </li>
    );

    return itemElement;
};

export const createItemElements = (className, items, itemElements, contents, level, getItemContent) => {

    for (let i = 0; i < items.length; i++) {

        const item = items[i];
        const content = getItemContent(item);
        const itemElement = createItemElement(className, item, i, level, content);

        itemElements[level][i] = itemElement;
        contents[level][i] = content;
    }

    return {
        itemElements,
        contents
    };
};

export const initialGetItemsProcessing = (className, items, stateObject, getItemContent) => {

    const itemElementsArgument = stateObject.itemElements;
    const contentsArgument = stateObject.contents;
    const selectedIndicies = [];
    const storedItems = [];

    const level = 0;

    const updateObject = prepElementArrays(itemElementsArgument, contentsArgument, level);
    const {
        itemElements,
        contents
    } = createItemElements(className, items, updateObject.itemElements, updateObject.contents, level, getItemContent);

    return { itemElements, contents, selectedIndicies, storedItems };
}

export default function NestedAccordion(props) {
    const [{ itemElements, contents, selectedIndicies, storedItems }, setChildren] = useState(() => {

        let initialState = {
            itemElements: [],
            contents: [],
            selectedIndicies: [],
            storedItems: []
        };

        const {
            itemElements,
            contents
        } = prepElementArrays(initialState.itemElements, initialState.contents, 0);

        initialState = { ...initialState, itemElements, contents };

        (new Promise((resolve, reject) => {
            props.getItems(null, resolve, reject);
        }))
            .then(items => {

                const updateObject = initialGetItemsProcessing(
                    props.className,
                    items,
                    { itemElements, contents, selectedIndicies, storedItems },
                    props.getItemContent);
                setChildren(updateObject);
            });

        return initialState;
    });

    return (
        <ul className={(props.className) ? props.className : "nested-accordion"}>
            {itemElements[0]}
        </ul>
    );
}