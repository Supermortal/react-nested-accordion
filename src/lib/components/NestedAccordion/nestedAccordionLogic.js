import React from 'react';
import classNames from 'classnames';

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