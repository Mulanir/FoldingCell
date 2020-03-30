import React, { Component, PureComponent } from "react";
import { connect } from "react-redux";
import { FlatList } from "react-native";
import { View, ScrollBar } from "react-native-ui-lib";

import Item from "src/components/views/Item";

class List extends PureComponent {
  getItems() {
    return this.props.items.map((itemData, index) => {
      return Object.assign({ key: `${index}` }, itemData);
    });
  }

  render() {
    let items = this.getItems();

    return (
      <FlatList
        renderItem={({ item }) => <Item {...item} />}
        data={items}
        // bg-green10
        // padding-8
        keyExtractor={item => item.key}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
  };
}

export default connect(mapStateToProps)(List);
