import React, { PureComponent } from "react";
import { StyleSheet, Animated, Easing } from "react-native";
import { Text, Card } from "react-native-ui-lib";

import Panel, { AnimatedView } from "src/components/views/Panel";

const AnimatedCard = Animated.createAnimatedComponent(Card);

class Item extends PureComponent {
  constructor() {
    super();

    this.HEIGHT_MAIN = 120;
    this.HEIGHT_SECOND = 60;
    this.DURATION = 400;

    this.animate = this.animate.bind(this);
    this.animateForw = this.animateForw.bind(this);
    this.animateBack = this.animateBack.bind(this);

    this.state = {
      inProgress: false,
      nextAnimation: this.animateForw,
      mainValue: new Animated.Value(0),
      secondValue: new Animated.Value(0),
      heightValue: new Animated.Value(this.HEIGHT_MAIN),
    };
  }

  animate() {
    if (this.state.inProgress) {
      return;
    }

    this.setState({ inProgress: true });
    this.state.nextAnimation();
  }

  animateForw() {
    let callback = () =>
      this.setState({
        inProgress: false,
        nextAnimation: this.animateBack,
      });
    Animated.parallel([
      Animated.sequence([
        Animated.timing(this.state.mainValue, {
          toValue: 1,
          duration: this.DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.secondValue, {
          toValue: 1,
          duration: this.DURATION,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(this.state.heightValue, {
        toValue: this.HEIGHT_MAIN * 2 + this.HEIGHT_SECOND,
        duration: this.DURATION * 2,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
    ]).start(callback);
  }

  animateBack() {
    let callback = () =>
      this.setState({
        inProgress: false,
        nextAnimation: this.animateForw,
      });
    Animated.parallel([
      Animated.sequence([
        Animated.timing(this.state.secondValue, {
          toValue: 0,
          duration: this.DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.mainValue, {
          toValue: 0,
          duration: this.DURATION,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(this.state.heightValue, {
        toValue: this.HEIGHT_MAIN,
        duration: this.DURATION * 2,
        easing: Easing.in(Easing.circle),
        useNativeDriver: false,
      }),
    ]).start(callback);
  }

  render() {
    return (
      <AnimatedCard
        onPress={this.animate}
        margin-8
        activeOpacity={1}
        borderRadius={0}
        enableShadow={false}
        style={{
          height: this.state.heightValue,
        }}>
        <AnimatedView height={this.HEIGHT_MAIN} padding-16 bg-blue20>
          <Text part1>{this.props.key1}</Text>
        </AnimatedView>
        <Panel
          height={this.HEIGHT_MAIN}
          animValue={this.state.mainValue}
          panelStyles={styles.mainItem}
          frontStyles={styles.mainItemFront}
          backStyles={styles.mainItemBack}
          keyFront={this.props.key2}
          keyBack={this.props.key3}
          nextPanel={
            <Panel
              height={this.HEIGHT_SECOND}
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
