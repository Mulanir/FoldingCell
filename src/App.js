import React, { Component } from "react";
import { View, ScrollBar } from "react-native-ui-lib";

import "src/styles/theme";
import "src/styles/constants";
import Item from "src/components/views/Item";

class App extends Component {
  render() {
    return (
      <ScrollBar padding-8 >
        <Item />
        <Item />
        <Item />
        <Item />
      </ScrollBar>
    );
  }
}

export default App;
