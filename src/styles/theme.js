import { PixelRatio } from "react-native";
import { ThemeManager } from "react-native-ui-lib";

ThemeManager.setComponentTheme("Text", (props, context) => {
  if (props.part1) {
    return {
      style: {
        fontSize: 14 * PixelRatio.getFontScale(),
      },
    };
  } else if (props.part2) {
    return {
      style: {
        fontSize: 18 * PixelRatio.getFontScale(),
      },
    };
  } else if (props.part3) {
    return {
      style: {
        fontSize: 22 * PixelRatio.getFontScale(),
      },
    };
  }
});
