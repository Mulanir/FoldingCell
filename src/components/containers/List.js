import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { ScrollView } from "react-native";

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
      <ScrollView>
        {items.map(item => (
          <Item {...item} />
        ))}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
  };
}

export default connect(mapStateToProps)(List);
