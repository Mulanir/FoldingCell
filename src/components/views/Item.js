import React, { PureComponent } from "react";
import { Animated, LayoutAnimation, Platform, UIManager } from "react-native";
import { Text, Card } from "react-native-ui-lib";

import Panel, { AnimatedView } from "src/components/views/Panel";

const AnimatedCard = Animated.createAnimatedComponent(Card);

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

class Item extends PureComponent {
  HEIGHT_MAIN = 120;
  HEIGHT_SECOND = 60;
  DURATION_OPEN = 300;
  DURATION_CLOSE = 200;

  constructor(props) {
    super(props);

    this.state = {
      height: 0,
      inProgress: false,
      nextAnimation: this.animateForw,
      mainValue: new Animated.Value(0),
      secondValue: new Animated.Value(0),
      thirdValue: new Animated.Value(0),
    };
  }

  animate = () => {
    if (this.state.inProgress) {
      return;
    }

    if (this.props.tryAnimate()) {
      this.state.nextAnimation();
    }
  };

  animateForw = () => {
    let callback = () => {
      this.props.stopAnimate();
      this.setState({
        inProgress: false,
        nextAnimation: this.animateBack,
      });
    };

    this.animateHeight(
      this.DURATION_OPEN * 3,
      LayoutAnimation.Types.easeOut,
      this.HEIGHT_MAIN + this.HEIGHT_SECOND * 2,
    );
    Animated.sequence([
      Animated.timing(this.state.mainValue, {
        toValue: 1,
        duration: this.DURATION_OPEN,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.secondValue, {
        toValue: 1,
        duration: this.DURATION_OPEN,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.thirdValue, {
        toValue: 1,
        duration: this.DURATION_OPEN,
        useNativeDriver: true,
      }),
    ]).start(callback);
  };

  animateBack = () => {
    let callback = () => {
      this.props.stopAnimate();
      this.setState({
        inProgress: false,
        nextAnimation: this.animateForw,
      });
    };

    this.animateHeight(
      this.DURATION_CLOSE * 3,
      LayoutAnimation.Types.easeIn,
      0,
    );
    Animated.sequence([
      Animated.timing(this.state.thirdValue, {
        toValue: 0,
        duration: this.DURATION_CLOSE,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.secondValue, {
        toValue: 0,
        duration: this.DURATION_CLOSE,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.mainValue, {
        toValue: 0,
        duration: this.DURATION_CLOSE,
        useNativeDriver: true,
      }),
    ]).start(callback);
  };

  animateHeight(duration, easing, height) {
    const animationConfig = {
      duration: duration,
      update: {
        type: easing,
      },
    };

    LayoutAnimation.configureNext(animationConfig);

    this.setState({
      inProgress: true,
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
                nextPanel={
                  <Panel
                    height={this.HEIGHT_SECOND}
                    animValue={this.state.thirdValue}
                    keyBack={this.props.key5}
                  />
                }
              />
            }
          />
        </AnimatedView>
        <Spacer height={this.state.height} />
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
