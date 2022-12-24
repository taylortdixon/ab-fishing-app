import { Button, TextInput, useTheme } from "react-native-paper";
import { Animated, StyleSheet } from "react-native";
import { useSearchBarAnimation } from "./search-bar-animation.hook";
import { withAnimated } from "../../components/with-animated";
import { SearchFilters } from "./waterbody-group-list-filters.hook";

const AnimatedTextInput = withAnimated(TextInput);

type WaterbodySearchBarProps = {
  updateSearchFilter: any;
  onShowSearchPanel: () => void;
  searchFilters: SearchFilters;
  animatedValue: Animated.Value;
};

const searchFilterLabelMap: Record<keyof SearchFilters, string> = {
  isOpenSeason: "Open Season",
  name: "",
  zone: "Zone",
  waterbodyType: "Waterbody Type",
};

export const WaterbodySearchBar: React.FC<WaterbodySearchBarProps> = ({
  searchFilters,
  updateSearchFilter,
  onShowSearchPanel,
  animatedValue,
}) => {
  const theme = useTheme();
  const { marginTop } = useSearchBarAnimation(animatedValue);

  const hasSearch = !!searchFilters.name;
  const onChangeText = (query: string) => updateSearchFilter("name", query);
  const onClearSearch = () => updateSearchFilter("name", "");

  const [appliedHiddenSearchFilterName] =
    Object.entries(searchFilters).find(
      ([k, v]: [keyof SearchFilters, any]) => k !== "name" && !!v
    ) || [];
  const hasHiddenFiltersApplied = !!appliedHiddenSearchFilterName;

  const onFilterButtonPress = () => {
    if (!hasHiddenFiltersApplied) {
      onShowSearchPanel();
      return;
    }

    updateSearchFilter(appliedHiddenSearchFilterName, undefined);
  };

  return (
    <Animated.View style={[{ marginTop }, styles.searchBarWrapper]}>
      <AnimatedTextInput
        clearButtonMode="unless-editing"
        placeholder="Search for waterbody"
        onChangeText={onChangeText}
        value={searchFilters.name}
        maxLength={15}
        style={{ backgroundColor: theme.colors.surface }}
        left={<TextInput.Icon icon="magnify" />}
        right={
          hasSearch && <TextInput.Icon icon="close" onPress={onClearSearch} />
        }
      />
      {hasHiddenFiltersApplied ? (
        <Button
          icon="close"
          mode="contained"
          style={styles.filterButton}
          onPress={onFilterButtonPress}
        >
          {searchFilterLabelMap[appliedHiddenSearchFilterName]}
        </Button>
      ) : (
        <Button
          icon="filter-variant"
          mode="contained-tonal"
          style={styles.filterButton}
          onPress={onFilterButtonPress}
        >
          Filters
        </Button>
      )}
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
