import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import "src/styles/theme";
import "src/styles/constants";
import reducer from "src/storage/reducers";
import List from "src/components/containers/List";

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <List />
      </Provider>
    );
  }
}

export default App;
