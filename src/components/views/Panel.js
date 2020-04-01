import React, { PureComponent } from "react";
import { Animated, StyleSheet } from "react-native";
import { View, Text } from "react-native-ui-lib";

import transform from "src/utils/transforms";

const AnimatedView = Animated.createAnimatedComponent(View);

class Panel extends PureComponent {
  constructor() {
    super();

    this.frontRef = React.createRef();
    this.backRef = React.createRef();
  }

  componentDidMount() {
    this.initInterpolatedValues();
    this.props.animValue.addListener(this.doTransform.bind(this));
  }

  initInterpolatedValues() {
    this.frontValue = this.props.animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 180],
      extrapolate: 0,
    });
    this.backValue = this.props.animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: 0,
    });
  }

  doTransform() {
    transform(
      this.frontRef,
      this.frontValue.__getValue(),
      this.props.height / 2,
    );
    transform(
      this.backRef,
      this.backValue.__getValue(),
      -this.props.height / 2,
    );
  }

  render() {
    return (
      <AnimatedView height={this.props.height} style={styles.panel}>
        <AnimatedView bg-red50 ref={this.frontRef} style={styles.front}>
          <Text {...this.props.frontTextProps}>{this.props.keyFront}</Text>
        </AnimatedView>
        <AnimatedView bg-green50 ref={this.backRef} style={styles.back}>
          <Text {...this.props.backTextProps}>{this.props.keyBack}</Text>
          {this.props.nextPanel}
        </AnimatedView>
      </AnimatedView>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  front: {
    height: "100%",
    width: "100%",
    backfaceVisibility: "hidden",
  },
  back: {
    position: "absolute",
    backfaceVisibility: "hidden",
    height: "100%",
    width: "100%",
    top: "100%",
    transform: [
      {
        rotateX: "180deg",
      },
    ],
  },
});

export default Panel;
export { AnimatedView };
