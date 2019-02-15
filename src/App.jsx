import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import NestedAccordion from './NestedAccordion';

const testItems = [
  { label: "Test1" },
  { label: "Test2" }
];

class App extends Component {

  getItems(item, resolve, reject) {
    resolve(testItems);
  }

  getItemContent(item) {
    return (
      <p>{item.label}</p>
    );
  }

  render() {
    return (
      <div className="App">
        <NestedAccordion getItems={this.getItems} getItemContent={this.getItemContent} />
      </div>
    );
  }
}

export default App;
