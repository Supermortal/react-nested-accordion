export const prepElementArrays = (itemElements, contents, level) => {
    itemElements[level] = [];
    contents[level] = [];
    return {
        itemElements,
        contents
    };
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

export const setSelectedIndex = (selectedIndicies, index, level) => {
    selectedIndicies[level] = index;
    selectedIndicies = cleanUpArray(selectedIndicies, level);
    return selectedIndicies;
};

export const setStoredItem = (storedItems, item, level) => {
    storedItems[level] = item;
    storedItems = cleanUpArray(storedItems, level);
    return storedItems;
};