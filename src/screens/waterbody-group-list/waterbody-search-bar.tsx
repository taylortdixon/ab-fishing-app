import { Searchbar } from "react-native-paper";
import { Animated } from "react-native";
import { useSearchBarAnimation } from "./search-bar-animation.hook";
import { withAnimated } from "../../components/with-animated";

const AnimatedSearchBar = withAnimated(Searchbar);

type WaterbodySearchBarProps = {
  onChangeSearch: (query: string) => void;
  onShowSearchPanel: () => void;
  searchValue: string;
  animatedValue: Animated.Value;
};

export const WaterbodySearchBar: React.FC<WaterbodySearchBarProps> = ({
  searchValue,
  onChangeSearch,
  onShowSearchPanel,
  animatedValue,
}) => {
  const { opacity, marginTop } = useSearchBarAnimation(animatedValue);

  return (
    <Animated.View
      style={{
        overflow: "hidden",
        left: 0,
        right: 0,
        position: "absolute",
        marginTop,
        opacity,
        zIndex: 1,
      }}
    >
      <AnimatedSearchBar
        placeholder="Search for waterbody"
        icon="filter-variant"
        onChangeText={onChangeSearch}
        onIconPress={onShowSearchPanel}
        value={searchValue}
        style={{ opacity: opacity }}
      />
    </Animated.View>
  );
};
