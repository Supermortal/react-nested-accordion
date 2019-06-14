Nested accordion examples:

###### NestedAccordion
```js
import { NestedAccordion } from 'react-nested-accordion';
import { testData } from './testData';

getItems(item, resolve, reject) {
    setTimeout(() => {
      if (!item) {
        resolve(testData.get("root"));
        return;
      }
  
      resolve(testData.get(item.label));
    }, 500);
}

getItemContent(item) {
    return (
        <p>{item.label}</p>
    );
}

getItemIsLeaf(item) {
    return item.isLeaf;
}

onChange() {
    return item => {
        console.log(item);
    }
}

onAccordionClear() {
    return e => {
        this.setState({ accordionId: uuidv4() });
    };
}

<NestedAccordion
    key={this.state.accordionId}
    getItems={this.getItems}
    getItemIsLeaf={this.getItemIsLeaf}
    onChange={this.onChange()}
    getLoadingComponent={
    () => (<div>Loading...</div>)
    }
    getItemContent={this.getItemContent} />
```