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
        easing: Easing.in(Easing.cubic),
        useNativeDriver: false,
      }),
    ]).start(callback);
  }

  render() {
    return (
      <AnimatedCard
        onPress={this.animate}
        marginH-16
        marginV-8
        activeOpacity={1}
        borderRadius={0}
        enableShadow={false}
        style={{
          height: this.state.heightValue,
          backgroundColor: "transparent",
        }}>
        <AnimatedView height={this.HEIGHT_MAIN} bg-blue20>
          <Text>{this.props.key1}</Text>
          <Panel
            height={this.HEIGHT_MAIN}
            animValue={this.state.mainValue}
            keyFront={this.props.key2}
            keyBack={this.props.key3}
            nextPanel={
              <Panel
                height={this.HEIGHT_SECOND}
                animValue={this.state.secondValue}
                keyBack={this.props.key4}
              />
            }
          />
        </AnimatedView>
      </AnimatedCard>
    );
  }
}

export default Item;
