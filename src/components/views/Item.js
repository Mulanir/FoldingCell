import React, { Component } from "react";
import { StyleSheet, Animated } from "react-native";
import { View, Text, Card } from "react-native-ui-lib";

import transform from "src/utils/transforms";

const AnimatedCard = Animated.createAnimatedComponent(Card);

class Item extends Component {
  constructor() {
    super();

    this._heightMain = 120;
    this._heightSecond = 80;
    this.animate = this.animate.bind(this);

    this.state = {
      mainValue: new Animated.Value(0),
      heightValue: new Animated.Value(120),
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

  doTransform() {
    transform(this.mainFrontRef, this.frontValue.__getValue(), 60);
    transform(this.mainBackRef, this.backValue.__getValue(), -60);
  }

  animate() {
    Animated.timing(this.state.mainValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(this.state.heightValue, {
      toValue: 240,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }

  render() {
    return (
      <AnimatedCard
        onPress={this.animate}
        margin-8
        borderRadius={0}
        enableBlur={false}
        style={{
          height: this.state.heightValue,
        }}>
        <Animated.View height={this._heightMain} padding-16>
          <Text part1>{this.props.key1}</Text>
        </Animated.View>
        <Animated.View height={this._heightMain} style={styles.secondItem}>
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
            <Text part2>{this.props.key3}</Text>
          </Animated.View>
        </Animated.View>
      </AnimatedCard>
    );
  }
}

const styles = StyleSheet.create({
  secondItem: {
    position: "absolute",
    width: "100%",
    backgroundColor: "red",
  },
  secondItemFront: {
    height: "100%",
    backgroundColor: "green",
  },
  secondItemBack: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "blue",
    backfaceVisibility: "hidden",
    top: "100%",
    transform: [
      {
        rotateX: "180deg",
      },
    ],
  },
});

export default Item;
