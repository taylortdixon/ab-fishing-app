import { Animated } from "react-native";

const Max_Header_Height = 52;
const Min_Header_Height = 0;
const Scroll_Distance = Max_Header_Height - Min_Header_Height;

export const useSearchBarAnimation = (animatedValue: Animated.Value) => {
  const opacity = animatedValue.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const marginTop = animatedValue.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [0, -Max_Header_Height],
    extrapolate: "clamp",
  });

  return { opacity: opacity, marginTop };
};
