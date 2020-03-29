import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native-ui-lib";

import Item from "src/components/views/Item";

class List extends Component {
  getItems() {
    return this.props.items.map((itemData, index) => {
      return <Item key={index} {...itemData} />;
    });
  }

  render() {
    let items = this.getItems();
    
    return <View bg-green10 padding-8>{items}</View>;
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
  };
}

export default connect(mapStateToProps)(List);
