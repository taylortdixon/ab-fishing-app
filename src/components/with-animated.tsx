import { Animated } from "react-native";
import React from "react";

export function withAnimated<TComponentProps>(
  WrappedComponent: React.ComponentType<TComponentProps>
) {
  // Extract the display name of the inputted component
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  // Create a class based on the React Component built-in
  class WithAnimated extends React.Component<TComponentProps> {
    // Set display name property of new class
    displayName = `WithAnimated( ${displayName} )`;

    // Return the inputted component wrapped as a WithAnimated that is so far only a default React Component
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  // Run the React Component through the built-in animatifier
  return Animated.createAnimatedComponent(WithAnimated);
}
