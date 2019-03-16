import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import './App.css';

import NestedAccordion from './NestedAccordion';
import { testData } from './testData';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      accordionId: uuidv4()
    }
  }

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

  render() {
    return (
      <div className="App">
        <button onClick={this.onAccordionClear()}>Clear</button>
        <NestedAccordion
          key={this.state.accordionId}
          getItems={this.getItems}
          getItemIsLeaf={this.getItemIsLeaf}
          onChange={this.onChange()}
          getLoadingComponent={
            () => (<div>Loading...</div>)
          }
          getItemContent={this.getItemContent} />
      </div>
    );
  }
}

export default App;
