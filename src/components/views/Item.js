import React, { Component } from "react";
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

    this.createRefs();
  }

  createRefs() {
    this.mainFrontRef = React.createRef();
    this.mainBackRef = React.createRef();
    this.secondFrontRef = React.createRef();
    this.secondBackRef = React.createRef();
  }

  componentDidMount() {
    this.state.mainValue.addListener(
      this.getValueListener(
        { front: this.mainFrontRef, back: this.mainBackRef },
        this.getInterpolatedValues(this.state.mainValue),
        this.heightMain,
      ).bind(this),
    );
    this.state.secondValue.addListener(
      this.getValueListener(
        { front: this.secondFrontRef, back: this.secondBackRef },
        this.getInterpolatedValues(this.state.secondValue),
        this.heightSecond,
      ).bind(this),
    );
  }

  getValueListener(refsObject, valuesObj, height) {
    function listener() {
      this.doTransform(refsObject, valuesObj, height);
    }

    return listener;
  }

  getInterpolatedValues(animatedValue) {
    let front = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 180],
      extrapolate: 0,
    });
    let back = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: 0,
    });

    return { front, back };
  }

  doTransform(refsObject, valuesObj, height) {
    transform(refsObject.front, valuesObj.front.__getValue(), height / 2);
    transform(refsObject.back, valuesObj.back.__getValue(), -height / 2);
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
        <AnimatedView height={this.heightMain} style={styles.mainItem}>
          <AnimatedView
            padding-16
            ref={this.mainFrontRef}
            style={styles.mainItemFront}>
            <Text part2>{this.props.key2}</Text>
          </AnimatedView>
          <AnimatedView ref={this.mainBackRef} style={styles.mainItemBack}>
            <Text part2 margin-16>
              {this.props.key3}
            </Text>
            {/* <AnimatedView height={this.heightSecond} style={styles.secondItem}>
              <AnimatedView
                padding-16
                ref={this.secondFrontRef}
                style={styles.secondItemFront}
              />
              <AnimatedView
                padding-16
                ref={this.secondBackRef}
                style={styles.secondItemBack}>
                <Text part3>{this.props.key4}</Text>
              </AnimatedView>
            </AnimatedView> */}
            <ItemPanel
              height={this.heightSecond}
              panelStyles={styles.secondItem}
              frontRef={this.secondFrontRef}
              frontStyles={styles.secondItemFront}
              backRef={this.secondBackRef}
              backStyles={styles.secondItemBack}
              keyBack={this.props.key4}
            />
          </AnimatedView>
        </AnimatedView>
      </AnimatedCard>
    );
  }
}

class ItemPanel extends Component {
  render() {
    return (
      <AnimatedView height={this.props.height} style={this.props.panelStyles}>
        <AnimatedView
          padding-16
          ref={this.props.frontRef}
          style={this.props.frontStyles}>
          <Text {...this.props.frontTextProps}>{this.props.keyFront}</Text>
        </AnimatedView>
        <AnimatedView
          padding-16
          ref={this.props.backRef}
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
