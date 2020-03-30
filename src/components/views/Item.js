import React, { Component } from "react";
import { StyleSheet, Animated } from "react-native";
import { View, Text, Card } from "react-native-ui-lib";

import transform from "src/utils/transforms";

class Item extends Component {
  constructor() {
    super();
    this._heightMain = 120;
    this._heightSecond = 80;
    this._heightThird = 50;
    this.animate = this.animate.bind(this);

    this.state = {
      mainValue: new Animated.Value(0),
    };
    this.state.mainValue.addListener(this.doTransform.bind(this));

    this.frontValue = this.state.mainValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 180],
    });
    this.backValue = this.state.mainValue.interpolate({
      inputRange: [0, 1],
      outputRange: [180, 360],
    });
  }

  animate() {
    let timing = Animated.timing(this.state.mainValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    });
    timing.start();
  }

  doTransform() {
    transform(this.mainFrontRef, this.frontValue.__getValue(), 120);
    transform(this.mainBackRef, this.backValue.__getValue(), 120);
  }

  render() {
    return (
      <Card height={this._height} margin-8 onPress={this.animate}>
        <Animated.View height={this._heightMain} padding-16>
          <Text part1>{this.props.key1}</Text>
        </Animated.View>
        <Animated.View height={this._heightSecond} style={styles.secondItem}>
          <Animated.View
            ref={el => (this.mainFrontRef = el)}
            padding-16
            style={styles.secondItemFront}>
            <Text part2>{this.props.key2}</Text>
          </Animated.View>
          <Animated.View
            ref={el => (this.mainBackRef = el)}
            padding-16
            style={styles.secondItemBack}>
            <Text part2>{this.props.key2}</Text>
          </Animated.View>
        </Animated.View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  secondItem: {
    backgroundColor: "red",
  },
  secondItemFront: {
    backgroundColor: "green",
  },
  secondItemBack: {
    position: "absolute",
    width: "100%",
    backgroundColor: "blue",
    backfaceVisibility: "hidden",
    transform: [
      {
        rotateX: "180deg",
      },
    ],
  },
});

export default Item;
