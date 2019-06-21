import React, { useState, useEffect } from 'react';
import { cleanUpArray, constructItemElements } from './nestedAccordionLogic';
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

NestedAccordion.propTypes = {
    getItems: PropTypes.func.isRequired,
    getItemContent: PropTypes.func.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onSecondClick: PropTypes.func,
    getLoadingComponent: PropTypes.func,
    getItemIsLeaf: PropTypes.func
};