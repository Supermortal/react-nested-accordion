# react-nested-accordion
![](https://travis-ci.com/Supermortal/react-nested-accordion.svg?branch=master)
![](https://david-dm.org/Supermortal/react-nested-accordion.svg)
![](https://david-dm.org/Supermortal/react-nested-accordion/dev-status.svg)
![](https://david-dm.org/Supermortal/react-nested-accordion/peer-status.svg)
[![npm version](https://badge.fury.io/js/react-nested-accordion.svg)](https://badge.fury.io/js/react-nested-accordion)

## Example Test Data

```
testData.set("root", [
    { label: "Test 0-1" },
    { 
        label: "Test 0-2",
        isLeaf: true
    },
    { label: "Test 0-3" }
]);

testData.set("Test 0-1", [
    { label: "Test 0-1-1" },
    { 
        label: "Test 0-1-2",
        isLeaf: true
    }
]);

testData.set("Test 0-3", [
    { 
        label: "Test 0-3-1",
        isLeaf: true
    },
    { 
        label: "Test 0-3-2",
        isLeaf: true
    },
    { 
        label: "Test 0-3-3",
        isLeaf: true
    },
    { 
        label: "Test 0-3-4",
        isLeaf: true
    }
]);

testData.set("Test 0-1-1", [
    { 
        label: "Test 0-1-1-1",
        isLeaf: true
    },
    { 
        label: "Test 0-1-1-2",
        isLeaf: true
    }
]);
```

## Props

### getItems (Required)
Function

```
getItems(item, resolve, reject) {
    if (!item) {
        resolve(testData.get("root"));
        return;
    }
  
    resolve(testData.get(item.label));
}
```

This is the main function used to get items for the accordion. ```item``` will be null on the first call, and every call after that will pass in the item associated with the accordion node clicked on.

### getItemContent (Required)
Function

```
getItemContent(item) {
    return (
        <p>{item.label}</p>
    );
}
```

This function is called by the accordion to get the content for the node itself. ```item``` will be the item used for each node. You can return whatever markup you want for each node.

### className
String

```className``` is used to give the accordion a custom class. ```'nested-accordion'``` is the default if no custom className is provided.

### onChange
Function

```
onChange(item) {
    console.log(item);
}
```

```onChange``` is fired when an accordion node is clicked. ```item``` is the data item associated with the clicked node.

### onSecondClick
Function

```
onSecondClick(item) {
    console.log(item);
}
```

This function is called when a node is clicked on twice. ```item``` is the data item associated with the clicked node.

### getLoadingComponent
Function

```
() => (<div>Loading...</div>)
```

This function is called when the accordion is waiting on ```getItems``` to resolve. The default behavior is no loading component.

### getItemIsLeaf
Function

```
getItemIsLeaf(item) {
    return item.isLeaf;
}
```

This function is called to check if an item is a leaf, to prevent unnecessary calls to ```getItems```. It's optional, but can help with performance.