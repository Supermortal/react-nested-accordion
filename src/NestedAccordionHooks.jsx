import React, { useState, useEffect, useLayoutEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// import {
//     checkForSecondClick,
//     cleanUpArray
// } from './NestedAccordionUtil';

export const cleanUpArray = (array, level) => {
    const levelPlus = level + 1;
    array.splice(levelPlus, array.length - levelPlus);
    return array;
};

export const createItemElement = (getItemContent, item, index, className, onItemClickHandler, childItemElements = null, isActive = false) => {

    const content = getItemContent(item);

    const accordionItemContentClasses = classNames("accordion-item-content", {
        active: isActive
    });

    const itemElement = (
        <li className="accordion-item" key={index}>
            <div 
                className={accordionItemContentClasses}
                onClick={onItemClickHandler}
            >
                {content}
            </div>
            {(childItemElements) ? <ul className={(className) ? className : "nested-accordion"}>{childItemElements}</ul> : null}
        </li>
    );

    return itemElement;
};

export const onItemClick = (onChange, selectedIndicies, setSelectedIndicies, items, setItems, level, index) => {
    return e => {

        selectedIndicies = cleanUpArray(selectedIndicies, level);
        const newSelectedIndicies = [...selectedIndicies];
        newSelectedIndicies[level] = index;
        setSelectedIndicies(newSelectedIndicies);

        items = cleanUpArray(items, level);
        const newItems = [...items];
        setItems(newItems);

        const item = items[level][index];
        if (onChange) onChange(item);
    };
};

export const constructItemElements = (getItemContent, className, onChange, selectedIndicies, setSelectedIndicies, items, setItems, level) => {

    let constructedItemElements = [];
    const selectedIndex = selectedIndicies[level];

    if (items[level + 1]) {
        constructedItemElements = constructItemElements(getItemContent, className, onChange, selectedIndicies, setSelectedIndicies, items, setItems, level + 1);
    }

    constructedItemElements = items[level].map((item, index) => {
        const childItemElements = (index === selectedIndex) ? constructedItemElements : null;
        const onItemClickHandler = onItemClick(onChange, selectedIndicies, setSelectedIndicies, items, setItems, level, index);
        const constructedItemElement = createItemElement(getItemContent, item, index, className, onItemClickHandler, childItemElements);
        return constructedItemElement;
    });

    return constructedItemElements;
};

export default function NestedAccordion(props) {

    const { 
        getItemContent, 
        className,
        getItems,
        onChange
    } = props;

    const [items, setItems] = useState([[]]);
    const [selectedIndicies, setSelectedIndicies] = useState([null]);

    const getItemsCall = async (item, level) => {
        const getItemsPromise = new Promise((resolve, reject) => {
            getItems(item, resolve, reject);
        });

        let newItems = [...items];
        
        const fetchedItems = await getItemsPromise;
        if (fetchedItems) {
            newItems[level] = fetchedItems;
        }
        else {
            newItems = cleanUpArray(newItems, level);
        }

        setItems(newItems);
    };

    useEffect(() => {
        const currentLevel = selectedIndicies.length - 1;
        const currentSelectedIndex = selectedIndicies[currentLevel];
        const currentItem = items[currentLevel][currentSelectedIndex];

        const getLevel = (selectedIndicies[0] === null) ? 0 : currentLevel + 1;

        getItemsCall(currentItem, getLevel);
    }, [selectedIndicies]);

    const constructedItemElements = constructItemElements(getItemContent, className, onChange, selectedIndicies, setSelectedIndicies, items, setItems, 0);

    return (
        <ul className={(className) ? className : "nested-accordion"}>
            {constructedItemElements}
        </ul>
    );
};

NestedAccordion.propTypes = {
    getItems: PropTypes.func.isRequired,
    getItemContent: PropTypes.func.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func
};