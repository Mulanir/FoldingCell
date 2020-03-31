import React, { PureComponent } from "react";
import { Animated } from "react-native";
import { View, Text } from "react-native-ui-lib";

import transform from "src/utils/transforms";

const AnimatedView = Animated.createAnimatedComponent(View);

export default class Panel extends PureComponent {
  constructor() {
    super();

    this.frontRef = React.createRef();
    this.backRef = React.createRef();
  }

  componentDidMount() {
    this.props.animValue.addListener(this.doTransform.bind(this));
    this.initInterpolatedValues();
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
      <AnimatedView height={this.props.height} style={this.props.panelStyles}>
        <AnimatedView ref={this.frontRef} style={this.props.frontStyles}>
          <Text {...this.props.frontTextProps}>{this.props.keyFront}</Text>
        </AnimatedView>
        <AnimatedView ref={this.backRef} style={this.props.backStyles}>
          <Text {...this.props.backTextProps}>{this.props.keyBack}</Text>
          {this.props.nextPanel}
        </AnimatedView>
      </AnimatedView>
    );
  }
}

export { AnimatedView };
