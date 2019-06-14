import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default function NestedAccordion(props) {

    const {
        className,
        getItems,
        getLoadingComponent,
        getItemIsLeaf
    } = props;

    const [items, setItems] = useState([[]]);
    const [selectedIndicies, setSelectedIndicies] = useState([null]);
    const [loading, setLoading] = useState({ index: null, level: null });

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

        setLoading({ index: null, level: null });
        setItems(newItems);
    };

    useEffect(() => {
        const currentLevel = selectedIndicies.length - 1;
        const currentSelectedIndex = selectedIndicies[currentLevel];
        const currentItem = items[currentLevel][currentSelectedIndex];

        const getLevel = (selectedIndicies[0] === null) ? 0 : currentLevel + 1;

        if (getItemIsLeaf && currentItem) {
            const itemIsLeaf = getItemIsLeaf(currentItem);
            if (itemIsLeaf) return;
        }

        setLoading({ index: currentSelectedIndex, level: currentLevel });
        getItemsCall(currentItem, getLevel);
    }, [selectedIndicies]);

    const constructedItemElements = constructItemElements(props, selectedIndicies, setSelectedIndicies, items, setItems, loading, 0);

    return (
        <ul className={(className) ? className : "nested-accordion"}>
            {(loading.index === null && loading.level === 0 && getLoadingComponent) ? getLoadingComponent() : null}
            {constructedItemElements}
        </ul>
    );
};

export const checkForSecondClick = (selectedIndicies, index, level) => {
    const oldLevelIndex = selectedIndicies[level];
    const isSecondClick = oldLevelIndex === index && level === (selectedIndicies.length - 1);

    return isSecondClick;
};

export const cleanUpArray = (array, level) => {
    const levelPlus = level + 1;
    array.splice(levelPlus, array.length - levelPlus);
    return array;
};

export const constructItemElements = (props, selectedIndicies, setSelectedIndicies, items, setItems, loading, level) => {

    const {
        getItemContent,
        className,
        onChange,
        onSecondClick,
        getLoadingComponent
    } = props;

    let constructedItemElements = null;
    const selectedIndex = selectedIndicies[level];

    if (items[level + 1]) {
        constructedItemElements = constructItemElements(props, selectedIndicies, setSelectedIndicies, items, setItems, loading, level + 1);
    }

    constructedItemElements = items[level].map((item, index) => {
        const isLoading = (index === loading.index && level === loading.level);
        const isActive = (index === selectedIndex);
        const childItemElements = (isActive) ? constructedItemElements : null;
        const onItemClickHandler = onItemClick(onChange, onSecondClick, selectedIndicies, setSelectedIndicies, items, setItems, level, index);
        const constructedItemElement = createItemElement(getItemContent, getLoadingComponent, item, index, className, onItemClickHandler, childItemElements, isActive, isLoading);
        return constructedItemElement;
    });

    return constructedItemElements;
};

export const createItemElement = (getItemContent, getLoadingComponent, item, index, className, onItemClickHandler, childItemElements = null, isActive = false, isLoading = false) => {

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
            {(isLoading && getLoadingComponent) ? getLoadingComponent() : null}
        </li>
    );

    return itemElement;
};

export const onItemClick = (onChange, onSecondClick, selectedIndicies, setSelectedIndicies, items, setItems, level, index) => {
    return e => {

        const item = items[level][index];

        const isSecondClick = checkForSecondClick(selectedIndicies, index, level);
        if (isSecondClick) {
            if (onSecondClick) {
                onSecondClick(item);
                return;
            }

            if (onChange) onChange(null);
            setItems([[]]);
            setSelectedIndicies([null]);
            return;
        }

        selectedIndicies = cleanUpArray(selectedIndicies, level);
        const newSelectedIndicies = [...selectedIndicies];
        newSelectedIndicies[level] = index;
        setSelectedIndicies(newSelectedIndicies);

        items = cleanUpArray(items, level);
        const newItems = [...items];
        setItems(newItems);

        if (onChange) onChange(item);
    };
};

NestedAccordion.propTypes = {
    getItems: PropTypes.func.isRequired,
    getItemContent: PropTypes.func.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onSecondClick: PropTypes.func,
    getLoadingComponent: PropTypes.func,
    getItemIsLeaf: PropTypes.func
};