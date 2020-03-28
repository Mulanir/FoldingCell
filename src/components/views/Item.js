import React, { Component } from "react";
import { View, Text, Card } from "react-native-ui-lib";

class Item extends Component {
  render() {
    return (
      <Card padding-16 margin-8>
        <Text>Hello1!</Text>
        <Text>Hello2!</Text>
        <Text>Hello3!</Text>
      </Card>
    );
  }
}

export default Item;
