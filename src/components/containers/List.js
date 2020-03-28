import React, { Component } from "react";
import { View, ScrollBar } from "react-native-ui-lib";

import Item from "src/components/views/Item";

class List extends Component {
  getItemData() {
    return {
      key1: "hello1",
      key2: "hello2",
      key3: "hello3",
    };
  }

  getItems() {
    let itemsAmount = 5;

    function* name() {
      for (let i = 0; i < itemsAmount; i++) {
        let data = this.getItemData();

        yield (<Item key={i} {...data} />);
      }
    }

    return Array.from(name.call(this));
  }

  render() {
    let items = this.getItems();

    return <ScrollBar padding-8>{items}</ScrollBar>;
  }
}

export default List;
