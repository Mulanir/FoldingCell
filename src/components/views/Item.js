import React, { PureComponent } from "react";
import {
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Text, Card } from "react-native-ui-lib";

import Panel, { AnimatedView } from "src/components/views/Panel";

const AnimatedCard = Animated.createAnimatedComponent(Card);

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

class Item extends PureComponent {
  constructor() {
    super();

    this.HEIGHT_MAIN = 120;
    this.HEIGHT_SECOND = 60;
    this.DURATION = 4000;

    this.animate = this.animate.bind(this);
    this.animateForw = this.animateForw.bind(this);
    this.animateBack = this.animateBack.bind(this);

    this.state = {
      height: 0,
      inProgress: false,
      nextAnimation: this.animateForw,
      mainValue: new Animated.Value(0),
      secondValue: new Animated.Value(0),
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
    this.animateHeight(
      LayoutAnimation.Types.easeOut,
      this.HEIGHT_MAIN + this.HEIGHT_SECOND,
    );
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
    ]).start(callback);
  }

  animateBack() {
    let callback = () =>
      this.setState({
        inProgress: false,
        nextAnimation: this.animateForw,
      });
    this.animateHeight(LayoutAnimation.Types.easeIn, 0);
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
    ]).start(callback);
  }

  animateHeight(easing, height) {
    const animationConfig = {
      duration: this.DURATION * 2,
      update: {
        type: easing,
        property: LayoutAnimation.Properties.height,
      },
    };

    LayoutAnimation.configureNext(animationConfig);

    this.setState({
      height,
    });
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
        <Spacer height={this.state.height}></Spacer>
      </AnimatedCard>
    );
  }
}

const Spacer = ({ height }) => (
  <Animated.View
    pointerEvents="none"
    style={{
      height,
      backgroundColor: "transparent",
    }}
  />
);

export default Item;
