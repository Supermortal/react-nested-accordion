import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
export default class NestedAccordion extends React.Component {

    constructor(props) {
        super(props);

        this.createItemElements.bind(this);
        this.clearAll.bind(this);
        this.handleSecondClick.bind(this);
        this.onItemClickPreprocess.bind(this);
        this.onItemClickPostprocess.bind(this);

        (new Promise((resolve, reject) => {
            this.props.getItems(null, resolve, reject);
        }))
            .then(this.initialGetItemsCallback.bind(this));

        this.state = {
            itemElements: [],
            contents: [],
            selectedIndicies: [],
            storedItems: []
        };
    }

    initialGetItemsCallback(items) {
        const level = 0;

        const {
            itemElements,
            contents
        } = this.prepElementArrays(this.state.itemElements, this.state.contents, level);
        const updateObject = this.createItemElements(items, itemElements, contents, level);

        this.setState(updateObject);
    }

    prepElementArrays(itemElements, contents, level) {
        itemElements[level] = [];
        contents[level] = [];
        return {
            itemElements,
            contents
        };
    }

    createItemElements(items, itemElements, contents, level) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const content = this.props.getItemContent(item);
            const itemElement = this.createItemElement(item, i, level, content);
            itemElements[level][i] = itemElement;
            contents[level][i] = content;
        }
        return {
            itemElements,
            contents
        };
    }

    createItemElement(item, index, level, content, childItemElements, isActive = false) {
        const accordionItemContentClasses = classNames("accordion-item-content", {
            active: isActive
        });
        const itemElement = (
            <li className="accordion-item" key={index}>
                <div className={accordionItemContentClasses} onClick={this.onItemClick(item, index, level)}>
                    {content}
                </div>
                {(childItemElements) ? <ul className={(this.props.className) ? this.props.className : "nested-accordion"}>{childItemElements}</ul> : null}
            </li>
        );
        return itemElement;
    }

    onItemClick(item, index, level) {
        return (e) => {

            let updateObject = this.onItemClickPreprocess(item, index, level, this.state);
            if (!updateObject) return;

            this.setState(updateObject);

            (new Promise((resolve, reject) => {
                this.props.getItems(item, resolve, reject);
            }))
                .then((items) => {
                    if (!items) return;

                    updateObject = this.onItemClickPostprocess(level, items, updateObject);
                    this.setState(updateObject);
                });
        };
    }

    onItemClickPreprocess(item, index, level, stateObject) {

        const argumentSelectedIndicies = stateObject.selectedIndicies;
        const argumentItemElements = stateObject.itemElements;
        const argumentContents = stateObject.contents;
        const argumentStoredItems = stateObject.storedItems;

        const hasSecondClick = this.handleSecondClick(argumentSelectedIndicies, item, index, level);
        if (hasSecondClick) return null;

        if (this.props.onChange) this.props.onChange(item);

        const {
            itemElements,
            contents
        } = this.cleanUpOldItemElements(argumentItemElements,
            argumentContents, argumentStoredItems, argumentSelectedIndicies, level);

        const selectedIndicies = this.setSelectedIndex(argumentSelectedIndicies, index, level);
        const storedItems = this.setStoredItem(argumentStoredItems, item, level);

        return { itemElements, contents, selectedIndicies, storedItems };
    }

    onItemClickPostprocess(level, items, stateObject) {

        const itemElementsArgument = stateObject.itemElements;
        const contentsArgument = stateObject.contents;
        const selectedIndicies = stateObject.selectedIndicies;
        const storedItems = stateObject.storedItems;

        const newLevel = level + 1;

        let updateObject = this.prepElementArrays(itemElementsArgument, contentsArgument, newLevel);
        updateObject = this.createItemElements(items, updateObject.itemElements, updateObject.contents, newLevel);
        let itemElements = updateObject.itemElements;
        const contents = updateObject.contents;

        itemElements = this.replaceOldElements(selectedIndicies, storedItems, itemElements, contents);

        return {
            itemElements,
            contents,
            selectedIndicies,
            storedItems
        };
    }

    handleSecondClick(selectedIndicies, item, index, level) {

        let hasSecondClick = false;

        const isSecondClick = this.isSecondClick(selectedIndicies, index, level);

        if (isSecondClick) {
            this.clearAll();
            if (this.props.onChange) this.props.onChange(null);
            hasSecondClick = true;
        }

        return hasSecondClick;
    }

    isSecondClick(selectedIndicies, index, level) {
        const oldLevelIndex = selectedIndicies[level];
        const isSecondClick = oldLevelIndex === index && level === (selectedIndicies.length - 1);

        return isSecondClick;
    }

    clearAll() {
        const replacementState = {
            itemElements: [],
            contents: [],
            selectedIndicies: [],
            storedItems: []
        };
        (new Promise((resolve, reject) => {
            this.props.getItems(null, resolve, reject);
        }))
            .then(items => {
                const level = 0;
                const {
                    itemElements,
                    contents
                } = this.prepElementArrays(replacementState.itemElements, replacementState.contents, level);
                const updateObject = this.createItemElements(items, itemElements, contents, level);
                replacementState.itemElements = updateObject.itemElements;
                replacementState.contents = updateObject.contents;
                this.setState(replacementState);
            });
    }

    setSelectedIndex(selectedIndicies, index, level) {
        selectedIndicies[level] = index;
        selectedIndicies = this.cleanUpArray(selectedIndicies, level);
        return selectedIndicies;
    }

    setStoredItem(storedItems, item, level) {
        storedItems[level] = item;
        storedItems = this.cleanUpArray(storedItems, level);
        return storedItems;
    }

    cleanUpArray(array, level) {
        const levelPlus = level + 1;
        array.splice(levelPlus, array.length - levelPlus);
        return array;
    }

    replaceOldElements(selectedIndicies, storedItems, itemElements, contents) {
        for (let level = 0; level < selectedIndicies.length; level++) {
            const selectedIndex = selectedIndicies[level];
            const storedItem = storedItems[level];
            const selectedContent = contents[level][selectedIndex];
            const childItemElements = (itemElements[level + 1]) ? itemElements[level + 1] : null;
            const isActive = (level === selectedIndicies.length - 1) ? true : false;
            const replacementItemElement = this.createItemElement(storedItem, selectedIndex, level, selectedContent, childItemElements, isActive);
            itemElements[level][selectedIndex] = replacementItemElement;
        }
        return itemElements;
    }

    cleanUpOldItemElements(itemElements, contents, storedItems, selectedIndicies, level) {
        itemElements = this.cleanUpArray(itemElements, level);
        contents = this.cleanUpArray(contents, level);
        const selectedIndex = selectedIndicies[level];
        const storedItem = storedItems[level];
        const selectedContent = contents[level][selectedIndex];
        const replacementItemElement = this.createItemElement(storedItem, selectedIndex, level, selectedContent);
        itemElements[level][selectedIndex] = replacementItemElement;
        return {
            itemElements,
            contents
        };
    }

    render() {
        return (
            <ul className={(this.props.className) ? this.props.className : "nested-accordion"}>
                {this.state.itemElements[0]}
            </ul>
        );
    }
}

NestedAccordion.propTypes = {
    getItems: PropTypes.func.isRequired,
    getItemContent: PropTypes.func.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func
}
