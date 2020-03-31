import React, { PureComponent } from "react";
import { StyleSheet, Animated } from "react-native";
import { Text, Card } from "react-native-ui-lib";

import Panel, { AnimatedView } from "src/components/views/Panel";

const AnimatedCard = Animated.createAnimatedComponent(Card);

class Item extends PureComponent {
  constructor() {
    super();

    this.heightMain = 120;
    this.heightSecond = 60;
    this.duration = 400;
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
        <Panel
          height={this.heightMain}
          animValue={this.state.mainValue}
          panelStyles={styles.mainItem}
          frontStyles={styles.mainItemFront}
          backStyles={styles.mainItemBack}
          keyFront={this.props.key2}
          keyBack={this.props.key3}
          nextPanel={
            <Panel
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
