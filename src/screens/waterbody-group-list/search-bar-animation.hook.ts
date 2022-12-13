import { useRef } from "react";
import { Animated } from "react-native";

const MAX_SEARCH_BAR_HEIGHT = 52;
const MINIMUM_SCROLL_THRESHOLD = MAX_SEARCH_BAR_HEIGHT / 2;
const SCROLL_BAR_ANIMATION_DURATION_MS = 250;

export const useSearchBarAnimation = (animatedValue: Animated.Value) => {
  const searchBarMarginTop = useRef(new Animated.Value(0)).current;

  const lastScrollPosition = useRef(0);

  animatedValue.addListener((currentScrollPosition) => {
    const scrollDistance =
      currentScrollPosition.value - lastScrollPosition.current;

    if (
      scrollDistance > 2 &&
      currentScrollPosition.value >= MINIMUM_SCROLL_THRESHOLD
    ) {
      Animated.timing(searchBarMarginTop, {
        toValue: -MAX_SEARCH_BAR_HEIGHT,
        duration: SCROLL_BAR_ANIMATION_DURATION_MS,
        useNativeDriver: false,
      }).start();
    } else if (
      scrollDistance < -2 ||
      currentScrollPosition.value <= MINIMUM_SCROLL_THRESHOLD
    ) {
      Animated.timing(searchBarMarginTop, {
        toValue: 0,
        duration: SCROLL_BAR_ANIMATION_DURATION_MS,
        useNativeDriver: false,
      }).start();
    }

    lastScrollPosition.current = currentScrollPosition.value;
  });

  return { marginTop: searchBarMarginTop };
};
