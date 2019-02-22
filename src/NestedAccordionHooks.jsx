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

export const createItemElement = (getItemContent, item, index, level, className, onItemClick, childItemElements = null, isActive = false) => {

    const content = getItemContent(item);

    const accordionItemContentClasses = classNames("accordion-item-content", {
        active: isActive
    });

    const itemElement = (
        <li className="accordion-item" key={index}>
            <div 
                className={accordionItemContentClasses}
                onClick={onItemClick(level, index)}
            >
                {content}
            </div>
            {(childItemElements) ? <ul className={(className) ? className : "nested-accordion"}>{childItemElements}</ul> : null}
        </li>
    );

    return itemElement;
};

export const onItemClick = (level, index) => {
    return e => {
        console.log(`level: ${level}`);
        console.log(`index: ${index}`);
    };
};

export default function NestedAccordion(props) {

    const [items, setItems] = useState(() => {
        const initialItems = prepElementArray([], 0);
        return initialItems;
    });
    const [selectedIndicies, setSelectedIndicies] = useState(() => {
        const initialSelectedIndicies = prepElementArray([], 0);
        return initialSelectedIndicies;
    });

    const getInitialItems = async () => {
        const getInitialItemsPromise = new Promise((resolve, reject) => {
            props.getItems(null, resolve, reject);
        });

        const initialFetchedItems = await getInitialItemsPromise;
        const returnItems = prepElementArray([], 0);
        returnItems[0] = initialFetchedItems;
        setItems(returnItems);
    };

    useEffect(() => {
        getInitialItems();
    }, []);

    const constructedItemElements = items[0].map((item, index) => {
        const itemElement = createItemElement(props.getItemContent, item, index, 0, props.className, onItemClick);
        return itemElement;
    });

    return (
        <ul className={(props.className) ? props.className : "nested-accordion"}>
            {constructedItemElements}
        </ul>
    );
}