import React, { Component, PureComponent } from "react";
import { StyleSheet, Animated } from "react-native";
import { View, Text, Card } from "react-native-ui-lib";

import transform from "src/utils/transforms";

const AnimatedCard = Animated.createAnimatedComponent(Card);
const AnimatedView = Animated.createAnimatedComponent(View);

class Item extends Component {
  constructor() {
    super();

    this.heightMain = 120;
    this.heightSecond = 60;
    this.duration = 500;
    this.animate = this.animate.bind(this);

    this.state = {
      mainValue: new Animated.Value(0),
      secondValue: new Animated.Value(0),
      heightValue: new Animated.Value(this.heightMain),
    };
  }

  animate() {
    Animated.sequence([
      Animated.timing(this.state.mainValue, {
        toValue: 1,
        duration: this.duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.secondValue, {
        toValue: 1,
        duration: this.duration,
        useNativeDriver: true,
      }),
    ]).start();
    Animated.timing(this.state.heightValue, {
      toValue: this.heightMain * 2 + this.heightSecond,
      duration: this.duration,
      useNativeDriver: false,
    }).start();
  }

  render() {
    return (
      <AnimatedCard
        onPress={this.animate}
        margin-8
        activeOpacity={1}
        style={{
          height: this.state.heightValue,
        }}>
        <AnimatedView height={this.heightMain} padding-16 bg-blue20>
          <Text part1>{this.props.key1}</Text>
        </AnimatedView>
        <ItemPanel
          height={this.heightMain}
          animValue={this.state.mainValue}
          panelStyles={styles.mainItem}
          frontStyles={styles.mainItemFront}
          backStyles={styles.mainItemBack}
          keyFront={this.props.key2}
          keyBack={this.props.key3}
          nextPanel={
            <ItemPanel
              height={this.heightSecond}
              animValue={this.state.secondValue}
              panelStyles={styles.secondItem}
              frontStyles={styles.secondItemFront}
              backStyles={styles.secondItemBack}
              keyBack={this.props.key4}
            />
          }
        />
      </AnimatedCard>
    );
  }
}

class ItemPanel extends PureComponent {
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
        <AnimatedView
          ref={this.frontRef}
          style={this.props.frontStyles}>
          <Text {...this.props.frontTextProps}>{this.props.keyFront}</Text>
        </AnimatedView>
        <AnimatedView
          ref={this.backRef}
          style={this.props.backStyles}>
          <Text {...this.props.backTextProps}>{this.props.keyBack}</Text>
          {this.props.nextPanel}
        </AnimatedView>
      </AnimatedView>
    );
  }
}

const panelCommonStyles = {
  position: "absolute",
  width: "100%",
};
const frontCommonStyles = {
  height: "100%",
  width: "100%",
};
const backCommonStyles = {
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
};

const styles = StyleSheet.create({
  mainItem: {
    ...panelCommonStyles,
  },
  mainItemFront: {
    ...frontCommonStyles,
    backgroundColor: "green",
  },
  mainItemBack: {
    ...backCommonStyles,
    backgroundColor: "blue",
  },
  secondItem: {
    ...panelCommonStyles,
    bottom: 0,
  },
  secondItemFront: {
    ...frontCommonStyles,
    backgroundColor: "gray",
  },
  secondItemBack: {
    ...backCommonStyles,
    backgroundColor: "yellow",
  },
});

export default Item;
