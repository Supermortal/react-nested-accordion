import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import NestedAccordion from './NestedAccordion';
import { testData } from './testData';

class App extends Component {

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

  onChange() {
    return item => {
      console.log(item);
    }
  }

  render() {
    return (
      <div className="App">
        <NestedAccordion
          getItems={this.getItems}
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
