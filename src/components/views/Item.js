import React, { Component } from "react";
import { View, Text, Card } from "react-native-ui-lib";

class Item extends Component {
  render() {
    return (
      <Card padding-16 margin-8>
        <Text>{this.props.key1}</Text>
        <Text>{this.props.key2}</Text>
        <Text>{this.props.key3}</Text>
      </Card>
    );
  }
}

export default Item;
