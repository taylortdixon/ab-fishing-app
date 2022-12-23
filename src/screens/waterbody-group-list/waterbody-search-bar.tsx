import {
  Button,
  Searchbar,
  Surface,
  TextInput,
  useTheme,
} from "react-native-paper";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useSearchBarAnimation } from "./search-bar-animation.hook";
import { withAnimated } from "../../components/with-animated";
import { SearchFilters } from "./waterbody-group-list-filters.hook";

const AnimatedSearchBar = withAnimated(Searchbar);
const AnimatedTextInput = withAnimated(TextInput);

type WaterbodySearchBarProps = {
  onChangeSearch: (query: string) => void;
  onShowSearchPanel: () => void;
  searchFilters: SearchFilters;
  animatedValue: Animated.Value;
};

export const WaterbodySearchBar: React.FC<WaterbodySearchBarProps> = ({
  searchFilters,
  onChangeSearch,
  onShowSearchPanel,
  animatedValue,
}) => {
  const theme = useTheme();
  const { marginTop } = useSearchBarAnimation(animatedValue);

  const hasSearch = !!searchFilters.name;
  const onClear = () => onChangeSearch("");

  const hasHiddenFiltersApplied = Object.entries(searchFilters).some(
    ([k, v]: [keyof SearchFilters, any]) => k !== "name" && !!v
  );

  return (
    <Animated.View style={[{ marginTop }, styles.searchBarWrapper]}>
      <AnimatedTextInput
        clearButtonMode="unless-editing"
        placeholder="Search for waterbody"
        onChangeText={onChangeSearch}
        value={searchFilters.name}
        maxLength={15}
        style={{ backgroundColor: theme.colors.surface }}
        left={<TextInput.Icon icon="magnify" />}
        right={hasSearch && <TextInput.Icon icon="close" onPress={onClear} />}
      />
      <Button
        mode={hasHiddenFiltersApplied ? "contained" : "contained-tonal"}
        style={styles.filterButton}
        onPress={onShowSearchPanel}
      >
        {hasHiddenFiltersApplied ? "Open Season" : "Filters"}
      </Button>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  searchBarWrapper: {
    display: "flex",
    overflow: "hidden",
    left: 0,
    right: 0,
    position: "absolute",
    zIndex: 1,
  },
  filterButton: {
    margin: 8,
    alignSelf: "flex-end",
  },
});
