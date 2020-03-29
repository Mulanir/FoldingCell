import React, { Component } from "react";
import { View, Text, Card } from "react-native-ui-lib";

class Item extends Component {
  constructor() {
    super();
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    console.log(123);
  }

  render() {
    return (
      <Card padding-16 margin-8 onPress={this.onPress}>
        <Text part1>{this.props.key1}</Text>
        <Text part2>{this.props.key2}</Text>
        <Text part3>{this.props.key3}</Text>
      </Card>
    );
  }
}

export default Item;
