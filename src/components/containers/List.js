import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { ScrollView } from "react-native";

import Item from "src/components/views/Item";

class List extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      inProgress: false,
    };
    this.tryAnimate = this.tryAnimate.bind(this);
    this.stopAnimate = this.stopAnimate.bind(this);
  }

  tryAnimate() {
    if (this.state.inProgress) {
      return false;
    } else {
      this.setState({ inProgress: true });
      return true;
    }
  }

  stopAnimate() {
    this.setState({ inProgress: false });
  }

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
          <Item
            tryAnimate={this.tryAnimate}
            stopAnimate={this.stopAnimate}
            {...item}
          />
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
