import React, { useState, useEffect, useLayoutEffect } from 'react';
import classNames from 'classnames';

import {
    prepElementArray,
    checkForSecondClick,
    cleanUpArray,
    setSelectedIndex,
    setStoredItem
} from './NestedAccordionUtil';

// export const createItemElement = (stateObject, className, getItems, setChildren, item, index, level, content, childItemElements, isActive = false) => {

//     const accordionItemContentClasses = classNames("accordion-item-content", {
//         active: isActive
//     });

//     const itemElement = (
//         <li className="accordion-item" key={index}>
//             <div className={accordionItemContentClasses}
//             onClick={onItemClick(item, index, level, stateObject, getItems, setChildren)}
//             >
//                 {content}
//             </div>
//             {(childItemElements) ? <ul className={(className) ? className : "nested-accordion"}>{childItemElements}</ul> : null}
//         </li>
//     );

//     return itemElement;
// };

// export const createItemElements = (stateObject, className, getItems, setChildren, items, itemElements, contents, level, getItemContent) => {

//     for (let i = 0; i < items.length; i++) {

//         const item = items[i];
//         const content = getItemContent(item);
//         const itemElement = createItemElement(stateObject, className, getItems, setChildren, item, i, level, content);

//         itemElements[level][i] = itemElement;
//         contents[level][i] = content;
//     }

//     return {
//         itemElements,
//         contents
//     };
// };

// export const initialGetItemsProcessing = (className, items, stateObject, getItemContent, getItems, setChildren) => {

//     const itemElementsArgument = stateObject.itemElements;
//     const contentsArgument = stateObject.contents;
//     const selectedIndicies = [];
//     const storedItems = [];

//     const level = 0;

//     const updateObject = prepElementArrays(itemElementsArgument, contentsArgument, level);
//     const {
//         itemElements,
//         contents
//     } = createItemElements(updateObject, className, getItems, setChildren, items, updateObject.itemElements, updateObject.contents, level, getItemContent);

//     return { itemElements, contents, selectedIndicies, storedItems };
// }

// export const handleSecondClick = (selectedIndicies, index, level, onChange) => {

//     let hasSecondClick = false;

//     const isSecondClick = isSecondClickFunc(selectedIndicies, index, level);

//     if (isSecondClick) {
//         clearAll();
//         if (onChange) onChange(null);
//         hasSecondClick = true;
//     }

//     return hasSecondClick;
// }

// export const clearAll = (getItems, initialGetItemsProcessing, setChildren, stateObject) => {
//     (new Promise((resolve, reject) => {
//         getItems(null, resolve, reject);
//     }))
//         .then(items => {

//             const updateObject = initialGetItemsProcessing(items, stateObject);
//             setChildren(updateObject);
//         });
// }

// export const replaceOldElements = (selectedIndicies, storedItems, itemElements, contents, createItemElement) => {

//     for (let level = 0; level < selectedIndicies.length; level++) {

//         const selectedIndex = selectedIndicies[level];
//         const storedItem = storedItems[level];
//         const selectedContent = contents[level][selectedIndex];
//         const childItemElements = (itemElements[level + 1]) ? itemElements[level + 1] : null;
//         const isActive = (level === selectedIndicies.length - 1) ? true : false;
//         const replacementItemElement = createItemElement(storedItem, selectedIndex, level, selectedContent, childItemElements, isActive);

//         itemElements[level][selectedIndex] = replacementItemElement;
//     }
//     return itemElements;
// }

// export const cleanUpOldItemElements = (itemElements, contents, storedItems, selectedIndicies, level) => {

//     itemElements = cleanUpArray(itemElements, level);
//     contents = cleanUpArray(contents, level);

//     const selectedIndex = selectedIndicies[level];
//     const storedItem = storedItems[level];
//     const selectedContent = contents[level][selectedIndex];
//     const replacementItemElement = createItemElement(storedItem, selectedIndex, level, selectedContent);

//     itemElements[level][selectedIndex] = replacementItemElement;

//     return {
//         itemElements,
//         contents
//     };
// }

// export const onItemClickPreprocess = (item, index, level, stateObject, onChange) => {

//     const argumentSelectedIndicies = (stateObject.selectedIndicies) ? stateObject.selectedIndicies : [];
//     const argumentItemElements = stateObject.itemElements;
//     const argumentContents = stateObject.contents;
//     const argumentStoredItems = (stateObject.storedItems) ? stateObject.storedItems : [];

//     const hasSecondClick = handleSecondClick(argumentSelectedIndicies, index, level, onChange);
//     if (hasSecondClick) return null;

//     if (onChange) onChange(item);

//     const {
//         itemElements,
//         contents
//     } = cleanUpOldItemElements(argumentItemElements,
//         argumentContents, argumentStoredItems, argumentSelectedIndicies, level);

//     const selectedIndicies = setSelectedIndex(argumentSelectedIndicies, index, level);
//     const storedItems = setStoredItem(argumentStoredItems, item, level);

//     return { itemElements, contents, selectedIndicies, storedItems };
// }

// export const onItemClickPostprocess = (level, items, stateObject, prepElementArrays, createItemElements, replaceOldElements) => {

//     const itemElementsArgument = stateObject.itemElements;
//     const contentsArgument = stateObject.contents;
//     const selectedIndicies = stateObject.selectedIndicies;
//     const storedItems = stateObject.storedItems;

//     const newLevel = level + 1;

//     let updateObject = prepElementArrays(itemElementsArgument, contentsArgument, newLevel);
//     updateObject = createItemElements(items, updateObject.itemElements, updateObject.contents, newLevel);
//     let itemElements = updateObject.itemElements;
//     const contents = updateObject.contents;

//     itemElements = replaceOldElements(selectedIndicies, storedItems, itemElements, contents);

//     return {
//         itemElements,
//         contents,
//         selectedIndicies,
//         storedItems
//     };
// }

// export const onItemClick = (item, index, level, stateObject, setChildren, getItems) => {
//     return (e) => {

//         let updateObject = onItemClickPreprocess(item, index, level, stateObject);
//         if (!updateObject) return;

//         setChildren(updateObject);

//         (new Promise((resolve, reject) => {
//             getItems(item, resolve, reject);
//         }))
//             .then((items) => {
//                 if (!items) return;

//                 updateObject = onItemClickPostprocess(level, items, updateObject);
//                 setChildren(updateObject);
//             });
//     };
// }

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

export const onItemClick = (level, index, selectedIndicies, setSelectedIndicies, items, setItems) => {
    return e => {
        selectedIndicies = cleanUpArray(selectedIndicies, level);

        const newSelectedIndicies = [...selectedIndicies];
        newSelectedIndicies[level] = index;
        
        setSelectedIndicies(newSelectedIndicies);

        items = cleanUpArray(items, level);
        const newItems = [...items];
        setItems(newItems);
    };
};

export const constructItemElements = (level, selectedIndicies, items, setItems, getItemContent, setSelectedIndicies, className, onItemClick) => {

    let constructedItemElements = [];
    const selectedIndex = selectedIndicies[level];

    if (items[level + 1]) {
        constructedItemElements = constructItemElements(level + 1, selectedIndicies, items, setItems, getItemContent, selectedIndicies, className, onItemClick);
    }

    constructedItemElements = items[level].map((item, index) => {
        const childItemElements = (index === selectedIndex) ? constructedItemElements : null;
        const onItemClickHandler = onItemClick(level, index, selectedIndicies, setSelectedIndicies, items, setItems);
        const constructedItemElement = createItemElement(getItemContent, item, index, className, onItemClickHandler, childItemElements);
        return constructedItemElement;
    });

    return constructedItemElements;
};

export default function NestedAccordion(props) {

    const [items, setItems] = useState(() => {
        const initialItems = prepElementArray([], 0);
        return initialItems;
    });
    const [selectedIndicies, setSelectedIndicies] = useState([null]);

    const getItems = async (item, level) => {
        const getItemsPromise = new Promise((resolve, reject) => {
            props.getItems(item, resolve, reject);
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

        getItems(currentItem, getLevel);
    }, [selectedIndicies]);

    const constructedItemElements = constructItemElements(0, selectedIndicies, items, setItems, props.getItemContent, setSelectedIndicies, props.className, onItemClick);

    return (
        <ul className={(props.className) ? props.className : "nested-accordion"}>
            {constructedItemElements}
        </ul>
    );
}