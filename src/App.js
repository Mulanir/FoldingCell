import React, { Component } from "react";
import { View, ScrollBar } from "react-native-ui-lib";

import "src/styles/theme";
import "src/styles/constants";
import List from "src/components/containers/List";

class App extends Component {
  render() {
    return <List />;
  }
}

export default App;
